const express = require('express')
// Create express instance
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Require API routes
const users = require('./routes/users')
const test = require('./routes/test')
const posts = require('./routes/posts')
const menu = require('./routes/menu')
const parser = require('./routes/parser')
const game = require('./routes/game')
const archive = require('./routes/archive')


const cors = require("cors");
app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

// Import API Routes

app.use(users)
app.use(test)
app.use(posts)
app.use(menu)
app.use(parser)
app.use(game)
app.use(archive)

// Export express app
module.exports = app

// // Start standalone server if directly running
// if (require.main === module) {
//   const port = process.env.PORT || 3001
//   app.listen(port, () => {
//     // eslint-disable-next-line no-console
//     console.log(`API server listening on port ${port}`)
//   })
// }
