if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: './config/.env'})
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const expressLayouts = require('express-ejs-layouts')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require("./config/database");

// Passport config
require('./config/passport')(passport)

//Connect To Database
connectDB();

const mainRouter = require('./routes/main')
const usersRouter = require('./routes/users')
const coursesRouter = require('./routes/courses')

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
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
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

//Middleware to override a link's GET method with DELETE 
//Must use the query parameter _method (e.g.: href="/logout?_method=DELETE")
app.use( function( req, res, next ) {
  // if _method is a query parameter...
  if ( req.query._method == 'DELETE' ) {
      // change the original METHOD into DELETE method 
      req.method = 'DELETE';
      // and set requested url to the path
      req.url = req.path;
  }       
  next(); 
});
  
app.use('/', mainRouter)
app.use('/users', usersRouter)
app.use('/courses', coursesRouter)
 
app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})  