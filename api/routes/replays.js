const {Router} = require('express')
const router = Router()
const maps = require('../models/map.model');
const user = require('../models/user.model');

const mongoose = require('mongoose');
const config = process.env.MONGO_CONNECT

mongoose.set('strictQuery', true);


mongoose.connect(config+'?authSource=admin', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(async () => {
    console.log("connect");

  })
  .catch(error => console.log('mongodb connected error! :' + error))




// Test route
router.use('/replays', async (req, res) => {

  // const records = await maps.find({}, {
  //   'idrep': 1,
  //   'time': 1,
  //   'date': 1,
  //   'link': 1,
  //   'players': 1,
  // }).sort( { "idrep": -1 } ).exec();

  const records = await maps.find({}, {
    'idrep': 1,
    'time': 1,
    'date': 1,
    'link': 1,
    'players': 1,
    'date_insert':1
  }).sort( { "date_insert": -1 } ).exec();


  res.status(201).send(records);

})


router.use('/replaysarchive', async (req, res) => {

  const reqq = req.body.link

  const records = await maps.find().where('link').in(reqq).exec();


  res.status(201).send(records);

})


module.exports = router
