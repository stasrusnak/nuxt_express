const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require('path');
const config = process.env.MONGO_CONNECT
const mongoose = require('mongoose');
const maps = require('../models/map.model');
mongoose.set('strictQuery', true);
const { Router } = require('express')
import {getClassColorByPlayer} from '../main/colorPiker'

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


let nickBase = []
let logs = []
let work = false

function startPars(datePars,iswork){
  mongoose.set('strictQuery', false)
  mongoose.connect(config+'?authSource=admin', {useUnifiedTopology: true,useNewUrlParser: true})
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
            let  resp = await maps.findOne({ idrep: item.idrep, time: item.time});
            if (!resp) {
              // let Maps = new maps(item)
              // await Maps.save()

              let chat = await getChat(item.link)

              let names = ''
              nickBase.forEach(e=>{ names += e.playerName+' '})
              let val = {...item, 'chat': chat, 'players': nickBase, 'names':names}


              if (chat){
                let Maps = new maps(val)
                await Maps.save()
              }

              console.log("save new rep link :"+ item.idrep);
              logs.push("save new rep link :"+ item.idrep);
            }
            if(!work) break;
            await wait(100);
          }
          console.log("done save links");
          logs.push("done save links");
        }
        console.log('New work')
        logs.push('New work')
        await wait(100)
      }while (work)


    })
    .catch(error => console.log('mongodb connected error! :' + error))



  const getChat = async (URL) => {
    nickBase = []
    const URLtext = `https://logs.irinabot.ru/94545/${URL.slice(0,-4)}.txt`;
    // const URLtext = `https://logs.irinabot.ru/94545/GHost++_2023-02-24_00-01_Legion_TD_x20_-prccah_+42_(64m14s).txt`;
    let response = await getRawDataLogs(URLtext);
    let text
    try {
      text = JSON.parse(new TextDecoder().decode(response));
    } catch (e) {
      text  = {};
      return text
    }
    const startLobby = []
    let chat = []
    let gameColors = []
    let startgame = null

    //cut lobby
    for (let i = 0; i < text.length; i++) {
      startLobby.push(text[i])
      if (text[i].event.payload.hcl && text[i].event.type === 6){
        startgame = i

        for (let y = 0; y < text[i].event.payload.slots.length; y++) {
          let str = text[i].event.payload.slots[y];
          gameColors.push(str.split(' ')[0])
        }

        gameColors = gameColors.slice(0, 8);
        break;
      }
    }

    const getPlayerByPid = (pid) => {
      let out = ''
      for (let y = 0; y < nickBase.length; y++) {
        if(nickBase[y].pid  === pid){
          out = nickBase[y]
        }
      }
      return out
    };



    ///Lobby chat
    for (let i = 0; i < startLobby.length; i++) {
      if (startLobby[i].event.type === 4){
        nickBase.push({
          'id': startLobby[i]?.event.payload?.id,
          'playerName':startLobby[i]?.event.payload?.playerName,
          'pid': startLobby[i]?.event.payload?.pid,
          'ip':startLobby[i]?.event.payload?.ip,
        })
      }else {
        if (startLobby[i].event.payload.reason) {
          let vudavil = startLobby[i].event.payload.reason.indexOf('?????????????????? ????????')

          let Player = getPlayerByPid(startLobby[i]?.event.payload?.pid)
          chat.push({
            text: Player.playerName+':  '+startLobby[i].event.payload.reason,
            color: '',
            nick: '',
            time: startLobby[i].time,
          })
          // console.log(Player.playerName+':  '+startLobby[i].event.payload.reason);
          for (let y = 0; y < nickBase.length; y++) {
            if(nickBase[y].pid  === startLobby[i]?.event.payload?.pid){
              nickBase.splice(y, 1);
            }
          }
          if(vudavil!==-1){
            nickBase.push({
              'id': startLobby[i-1]?.event.payload?.id,
              'playerName':startLobby[i-1]?.event.payload?.playerName,
              'pid': startLobby[i-1]?.event.payload?.pid,
              'ip':startLobby[i-1]?.event.payload?.ip,
            })
          }

        }

        let Player = getPlayerByPid(startLobby[i]?.event.payload?.fromPID)
        if(Player === ''){
          if (startLobby[i].event.payload.text){
            chat.push({
              text: startLobby[i].event.payload.text,
              color: '',
              nick: '',
              time: startLobby[i].time,
            })
            // console.log(startLobby[i].time+' > '+startLobby[i].event.payload.text);
          }
        }else {
          chat.push({
            text: startLobby[i].event.payload.text,
            color: '',
            nick: Player.playerName,
            time: startLobby[i].time,
          })
          // console.log(startLobby[i].time+' > '+Player.playerName+':  '+startLobby[i]?.event.payload?.text);
        }
      }
    }

    // console.log(startgame)
    // console.log(gameColors)
    // console.log(nickBase)

    //Set players color
    for (let i = 0; i < nickBase.length; i++) {
      let index = gameColors.indexOf(nickBase[i].pid+'');
      if(index !== -1){
        nickBase[i].color = getClassColorByPlayer(index)
      }
    }
    ///Game chat
    for (let i = startgame; i < text.length; i++) {
      let Player = getPlayerByPid(text[i].event.payload?.fromPID)
      if(Player === ''){
        if (text[i].event.payload.text){
          chat.push({
            text: text[i].event?.payload?.text,
            color: '',
            nick: '',
            time: text[i].time,
          })
          // console.log(text[i].time+' > '+text[i].event?.payload?.text)
        }
      }else {
        chat.push({
          text: text[i].event?.payload?.text,
          color: Player.color,
          nick: Player.playerName,
          time: text[i].time,
        })
        // console.log(text[i].time+' > '+Player.playerName+':  '+text[i]?.event.payload?.text);
      }
    }

    return chat
  }

  const getRawDataLogs = (URL) => {
    return fetch(URL)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        return data;
      })
      .catch(function (err) {
        console.log(err)
      });
  };


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
      if(err) { //???????? ???????????????? ????????????, ?????????????? ???? ?? ??????????????
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
