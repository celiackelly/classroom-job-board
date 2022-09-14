const User = require('../models/User')
const Course = require('../models/Course')
const Student = require('../models/Student')

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const courses = await Course.find({userId: req.user.id})
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
            const students = await Student.find({ enrolledInCourse: req.params.courseId }).lean()
            res.render('course', {title: 'Course', course, students})
        } catch (err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to get course.' })
            res.redirect(303, `/users/dashboard`)
        }
    }
}