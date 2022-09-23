const express = require('express')
const router = express.Router()
const coursesController = require('../controllers/courses')
const { ensureAuth } = require('../middleware/auth')

//Handle POST requests to add a course
//How to differentiate posting ONE course vs. importing from Google?
//Handle on the same route, or not? 
router.post('/', ensureAuth, coursesController.createCourse)

router.put('/:id/jobList/edit', ensureAuth, coursesController.editJobList)

router.post('/google', ensureAuth, coursesController.importCourses)

module.exports = router