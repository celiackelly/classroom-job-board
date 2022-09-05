if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: './config/.env'})
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const expressLayouts = require('express-ejs-layouts')
const flash = require('express-flash')
const logger = require('morgan')
const dbConnection = require('./config/database')

// Passport config
require('./config/passport')(passport)

const mainRoutes = require('./routes/main')

app.set('view engine', 'ejs')
app.set('layout', './layouts/layout')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(expressLayouts)
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ clientPromise: dbConnection}),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Lets you access currentUser in ejs files (to change the navbar links based on whether a user is signed in)
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
  
app.use('/', mainRoutes)
 
app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})  