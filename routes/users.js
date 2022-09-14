const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const { ensureAuth } = require('../middleware/auth')

//Handle GET (READ) requests for the individual user dashboard
router.get('/dashboard', ensureAuth, usersController.getDashboard)

// GET the view for an individual course
router.get('/courses/:courseId', ensureAuth, usersController.getCourse)

module.exports = router