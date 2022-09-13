const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const passport = require('passport')
const { ensureAuth } = require('../middleware/auth')
const { ensureGuest } = require('../middleware/auth')

//GET home page (index.ejs)
router.get('/', homeController.getIndex)

//GET sign-up page
router.get('/signup', ensureGuest, authController.getSignup)

//GET login page
router.get('/login', ensureGuest, authController.getLogin)

//POST to /sign-up to create an account
router.post('/signup', authController.postSignup)

//POST to /login to login (authenticate) a user
router.post('/login', authController.postLogin)

// GET /auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// GET /auth/google/callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`/users/dashboard`)
  }
)

// GET /auth/google/api 
// For Google Classroom authentication



//Handle DELETE requests to the /logout route - to logout/deauthenticate a use
//Custom middleware in server.js handles overriding the link's GET method
router.delete('/logout', authController.logout)

module.exports = router
