const express = require('express')
const router = express.Router()
const coursesController = require('../controllers/courses')
const { ensureAuth } = require('../middleware/auth')

// @desc    Add a course 
// @route   POST /courses
/* 
* How to differentiate posting ONE course vs. importing from Google?
* Handle on the same route, or not? 
*/
router.post('/', ensureAuth, coursesController.createCourse)

router.post('/google', ensureAuth, coursesController.importCourses)

// @desc    Add students to a given course
// @route   POST /courses/:id/students
router.post('/:id/students', ensureAuth, coursesController.addStudents)

// @desc    Rename a course
// @route   PUT /courses/:id/rename
router.put('/:id/rename', ensureAuth, coursesController.renameCourse)

// @desc    Edit the job list for a given course
// @route   PUT /courses/:id/jobList
router.put('/:id/jobList', ensureAuth, coursesController.editJobList)

// @desc    Assign jobs for a given course (batch)
// @route   PUT /courses/:id/currentJobAssignments
router.put('/:id/currentJobAssignments', ensureAuth, coursesController.assignJobs)

// @desc    Delete a course
// @route   DELETE /courses/:id
router.delete('/:id', ensureAuth, coursesController.deleteCourse)

module.exports = router