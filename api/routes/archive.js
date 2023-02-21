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
router.use('/archive', async (req, res) => {

  const reqq = req.body.maps
  const records = await maps.find().where('_id').in(reqq).exec();


  res.status(201).send(records);

})


router.use('/userarchive', async (req, res) => {

  const reqq = req.body.nick
  const records = await user.find().where('nick').in(reqq).exec();


  res.status(201).send(records);

})


module.exports = router
