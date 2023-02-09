const { Router } = require('express')

const router = Router()

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:nick', function (req, res, next) {

  //  let par = req.params.nick
  // if (par === '(ANUBIS)') {
  //   res.send('dadata')
  // } else {
  //   res.sendStatus(404)
  // }

  res.send('dadada')
})

module.exports = router
