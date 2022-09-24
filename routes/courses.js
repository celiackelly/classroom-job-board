const express = require('express')
const router = express.Router()
const coursesController = require('../controllers/courses')
const { ensureAuth } = require('../middleware/auth')

//Handle POST requests to add a course
//How to differentiate posting ONE course vs. importing from Google?
//Handle on the same route, or not? 
router.post('/', ensureAuth, coursesController.createCourse)

router.post('/google', ensureAuth, coursesController.importCourses)

router.post('/:id/students', ensureAuth, coursesController.addStudents)

router.put('/:id/jobList', ensureAuth, coursesController.editJobList)

module.exports = router