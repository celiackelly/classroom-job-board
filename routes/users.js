const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const { ensureAuth } = require('../middleware/auth')

//Handle GET (READ) requests for the individual user dashboard
router.get('/:id/dashboard', ensureAuth, usersController.getDashboard)

module.exports = router