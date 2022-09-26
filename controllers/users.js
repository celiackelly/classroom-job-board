const Course = require('../models/Course')
const Student = require('../models/Student')
const Job = require('../models/Job')

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const courses = await Course.find({userId: req.user.id}).sort('name').exec()
            courses.forEach(course => {
                course.studentCount = course.students.length
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
            const course = await Course.findById(req.params.courseId)
                .populate(['jobList', 
                    { path: 'currentJobAssignments', populate: [{path: 'job'}, {path: 'student'}],}])
                .lean()
            const students = await Student.find({ enrolledInCourse: req.params.courseId })
                .sort('lastName')
                .populate('jobHistory').lean()

            const assignedStudents = course.currentJobAssignments
                .filter(assignment => assignment.student)
                .map(assignment => assignment.student)
            //ObjectId.prototype.equals() to compare two (identical or equivalent) ObjectIds
            const unassignedStudents = students.filter(({ _id: id1 }) => !assignedStudents.some(({ _id: id2 }) => id1.equals(id2)))

            // these are all the job choices from the db, to display in the editJobList modal
            const allJobs = await Job.find({}).sort('title').exec()
            res.render('course', {title: 'Course', course, students, unassignedStudents, allJobs})
            
        } catch (err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to get course.' })
            res.redirect(303, `/users/dashboard`)
        }
    }
}