const Course = require('../models/Course')
const Student = require('../models/Student')
const Job = require('../models/Job')
const googleApi = require("../utils/google-api")

module.exports = {
    createCourse: async (req, res) => {
        try {
            const course = await Course.create({
                name: req.body.className,
                userId: req.user._id, 
            })
            const studentFNames = req.body.studentFName
            const studentLNames = req.body.studentLName
            const studentList = studentFNames.map((fName, i) => {
                let student = {
                    firstName: fName, 
                    lastName: studentLNames[i], 
                    enrolledInCourse: course._id
                }
                return student
            })
            const students = await Student.create(studentList)
            console.log(students)
            const studentIds = students.map(student => student._id)

            await Course.updateOne({_id: course._id}, { $push: { students: {
                $each: studentIds
            } } })

            console.log('Course Added') 
            res.redirect(303, `/users/dashboard`)
        } catch(err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to create course.' })
            res.redirect(303, `/users/dashboard`)
        }
    },
    /*This function is not built out yet */
    importCourses: async (req, res) => {
        //make sure you disallow adding courses that already exist! think about how to do this...
        //set importedFromGoogle to false
        try {
            // await Course.create({
            //     name: req.body.name,
            //     students: req.body.students,
            //     userId: request.user._id
            // })
            console.log('Courses Imported from Google Classroom') 
            res.redirect(303, `/users/dashboard`)
        } catch(err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to import courses from Google Classroom.' })
            res.redirect(303, `/users/dashboard`)
        }
    },
    editJobList: async (req, res) => {
        try {
            const jobListInput = req.body.jobList
            //How can I pass the job IDs through instead, while still displaying just the titles in the datalist input? 
            const jobList = await Job.find({ title: { $in: jobListInput } }).sort('title')
            const jobIds = jobList.map(job => job._id)

            await Course.findByIdAndUpdate(req.params.id, {
                jobList: jobIds
            }, {
                upsert: false, 
                runValidators: true
            })
            console.log(`Course Updated: editJobList`)
            //By default, Express uses HTTP 302 for redirect, but this prevents PUT/POST requests from being redirected, 
            //so you have to set the code to 303
            //https://expressjs.com/en/api.html#res.redirect - also note the leading vs. trailing slashes
            res.redirect(303, `/users/courses/${req.params.id}`)
        } catch(err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to update class job list.' })
            res.redirect(303,  `/users/courses/${req.params.id}`)
        }
    },
    addStudents: async (req, res) => {
        try {
            const studentFNames = req.body.studentFName
            const studentLNames = req.body.studentLName
            const studentList = studentFNames.map((fName, i) => {
                let student = {
                    firstName: fName, 
                    lastName: studentLNames[i], 
                    enrolledInCourse: req.params.id
                }
                return student
            })
            const students = await Student.create(studentList)
            console.log(students)
            const studentIds = students.map(student => student._id)

            await Course.updateOne({_id: req.params.id}, { $push: { students: {
                $each: studentIds
            } } })

            console.log('Students Added to Course') 
            res.redirect(303, `/users/courses/${req.params.id}`)
        } catch(err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to add students to course.' })
            res.redirect(303, `/users/courses/${req.params.id}`)
        }
    },
    assignJobs: async (req, res) => {
        try {
            console.log(req.body)
            //find course by id that matches req.params.id
            //update currentJobAssignments for the course
            
            //update student job histories
                //if they have a current job, update endedOn with current datetime
                //if they have a new job, add it, with startedOn datetime

            console.log(`Course Updated: assignJobs`)
            res.redirect(303, `/users/courses/${req.params.id}`)
        } catch(err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to assign jobs.' })
            res.redirect(303,  `/users/courses/${req.params.id}`)
        }
    },
}

