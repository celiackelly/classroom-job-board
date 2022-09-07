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

//how to SIGN UP with Google? 

//POST to /login to login (authenticate) a user
router.post('/login', authController.postLogin)

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`/users/${req.user._id}/dashboard`)
  }
)

//Change back from GET to DELETE
//Handle DELETE requests to the /logout route - to logout/deauthenticate a use
//Custom middleware in server.js handles overriding the link's GET method
router.get('/logout', authController.logout)

module.exports = router
