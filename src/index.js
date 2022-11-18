const express = require('express')
var cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const { protectUser } = require('./middlewares/auth')

const app = express()

const whitelist = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'http://localhost:3000/',
]
const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      // for mobile app and postman client
      return callback(null, true)
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowedHeaders: '*',
  'Access-Control-Request-Headers': '*',
}

app.use(cors(corsOptions))

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(console.log('DB Connected'))

app.use(express.json())
app.use('/images', express.static('images'))

app.use('/api/auth', require('./routes/authRoutes'))
// app.use('/api/volunteer', protectUser, require('./routes/volunteerRoutes'))
// app.use('/api/post', require('./routes/postRoutes'))

// app.use('/api/hotel',)

////// TEST/////////
app.get('/', (req, res) => {
  res.send('<p>Goto <a href="https://bonappletea.netlify.app">Bon Appetit</a></p>')
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Ecommerce app listening for request`)
})
