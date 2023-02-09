const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require('path');
const config = process.env.API_TOKEN
const mongoose = require('mongoose');
const maps = require('../models/map.model');

const { Router } = require('express')


const router = Router()

const wait = ms => new Promise(res => setTimeout(res, ms))


function getTime(minutes){
  let times={}
  let date = new Date();
  let currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() - minutes);
  let prevTime = ('0'+currentTime.getHours()).slice(-2)+':'+('0'+currentTime.getMinutes()).slice(-2);

  let options = {
    day: "numeric",
    year: "numeric",
    month: "short",
    hour:'2-digit',
    minute:'2-digit'

  };

  date = date.toLocaleDateString("en-BZ", options)
  date = date.replace(/ /g, '-')
  date = date.replace(/,-/g, ' ')

  times['current'] = date
  let replacement = prevTime
  let result = date.slice(0, -5) + replacement;
  times['prev'] = result

  return times
}

// let datePars = '2023-01-10'
// let datePars = new Date().toJSON().slice(0, 10);


let logs = []

let work = false

function startPars(datePars,iswork){
  mongoose.set('strictQuery', false)
  mongoose.connect(config, {useUnifiedTopology: true,useNewUrlParser: true})
    .then(async () => {
      console.log('mongodb connected!')
      console.log(datePars)
      if(iswork) work = iswork

      do {
        if(getReplays()){
          let linkBase = getLinks(datePars)

          for (const item of linkBase) {
            if (logs.length > 10) logs = logs.slice(-10)
            console.log(item)
            logs.push(item);
            let  resp = await maps.findOne({ idrep: item.idrep,
              time: item.time});
            if (!resp) {
              let Maps = new maps(item)
              await Maps.save()
              console.log("save new rep link :"+ item.idrep);
              logs.push("save new rep link :"+ item.idrep);
            }
            if(!work) break;
            await wait(500);
          }
          console.log("done save links");
          logs.push("done save links");
        }

        console.log('New work')
        logs.push('New work')
        await wait(50000)
      }while (work)


    })
    .catch(error => console.log('mongodb connected error! :' + error))


  const getRawData = (URL) => {
    return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
        return data;
      });
  };


  let body

// URL for data
  const URL = "https://replays.irinabot.ru/94545/";
  const getReplays = async () => {
    body = await getRawData(URL);
    fs.writeFile(path.resolve(__dirname,'../src/site/site.html'), body, function(err) {
      if(err) { //если возникла ошибка, выводим ее в консоль
        return console.log(err);
      }
      console.log("getReplays Done!");
      return true
    });

  };
  function getLinks(datePars){
    const file = fs.readFileSync(path.resolve(__dirname,'../src/site/site.html')).toString();

    if (file){
      const links = file.match(/GHost(.*?x20.*?\.)w3g/gm);
      let linkBase = []
      links.forEach(i=>{
        let re = decodeURIComponent(i)
        let mapdate =  re.match(/GHost\+\+_(.*?)_/m);
        if ( new Date(mapdate[1]) >= new Date(datePars)) {
          let parsLink =  re.match(/GHost\+\+_(.*?)_Legion_TD_x20_-prccah_\+(.*?)_\((.*?)\)\.w3g/m);
          if(parsLink){
            parsLink[3] = parsLink[3].replace(/m/g, ':')
            parsLink[3] = parsLink[3].replace(/s/g, '')
            linkBase.push(
              {
                'date':parsLink[1],
                'time':parsLink[3],
                'idrep':parsLink[2],
                'link':parsLink[0]
              })
          }
        }
      })
      console.log("getLinks Done!");
      return linkBase
    }

  }

}

router.post("/parser", async (req, res) => {
   // console.log(req.body.date )
  startPars(req.body.date,true)
  res.status(201).send('start work');
});

router.post("/parser/stop", async (req, res) => {

  console.log(req.body.work)
  work = req.body.work
  res.status(201).send('stop work');
});

router.post("/parser/status", async (req, res) => {
  res.status(201).send(work);
});


router.post("/parser/logs", async (req, res) => {
  res.status(201).send(logs);
});


module.exports = router;
