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

    //         const video = await Video.findOne({ urlId }) // find video
    //         .populate('likes user') // populate the likes and owner (user) of video
    //         .populate({
    //             path: 'comments', // populate the comments as well,
    //             options: { sort: { date: -1 } }, // sorting the comments by date
    //             populate: {
    //                 path: 'user', // and populating the owner (user) of each comment,
    //                 select: 'username, date', // plucking whichever fields necessary from the User model
    //             },
    //         })
    // ]);

            const course = await Course.findById(req.params.courseId)
                .populate(
                ['jobList', 
                { path: 'currentJobAssignments', populate: [{path: 'job'}, {path: 'student'}],}])
                .lean()
            console.log(course.currentJobAssignments.map(assignment => assignment.job.title).sort((a, b) => a.localeCompare(b)))
            const students = await Student.find({ enrolledInCourse: req.params.courseId })
                .sort('lastName')
                .populate('jobHistory').lean()

            const assignedJobs = course.currentJobAssignments.map(assignment => assignment.job)
            //ObjectId.prototype.equals() to compare two (identical or equivalent) ObjectIds
            const unassignedJobs = course.jobList.filter(({ _id: id1 }) => !assignedJobs.some(({ _id: id2 }) => id1.equals(id2)))

            const assignedStudents = course.currentJobAssignments.filter(assignment => assignment.student).map(assignment => assignment.student)
            const unassignedStudents = students.filter(({ _id: id1 }) => !assignedStudents.some(({ _id: id2 }) => id1.equals(id2)))

            // these are all the job choices from the db, to display in the edit modal to choose the jobList for the course
            const allJobs = await Job.find({}).sort('title').exec()
            res.render('course', {title: 'Course', course, students, unassignedJobs, unassignedStudents, allJobs})
            
        } catch (err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to get course.' })
            res.redirect(303, `/users/dashboard`)
        }
    }
}