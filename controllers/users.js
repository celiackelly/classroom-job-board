const User = require('../models/User')
const Course = require('../models/Course')
const Student = require('../models/Student')
const Job = require('../models/Job')

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const courses = await Course.find({userId: req.user.id}).exec()
            courses.forEach(course => {
                course.studentCount = course.students.length
                console.log(course.studentCount)
            })
            res.render('dashboard', { title: 'Dashboard', user: req.user, courses})
        } catch(err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to get user dashboard.' })
            res.redirect(303, '/')
        }
    }, 
    getCourse: async (req, res) => {
        try {
            const course = await Course.findById(req.params.courseId).lean()
            //refactor with .populate?
            const students = await Student.find({ enrolledInCourse: req.params.courseId }).lean()
            
            // this is all the job choices from the db, to display in the edit modal to choose the jobList for the course
            const allJobs = await Job.find({}).exec()
            res.render('course', {title: 'Course', course, students, allJobs})
        } catch (err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to get course.' })
            res.redirect(303, `/users/dashboard`)
        }
    }
}