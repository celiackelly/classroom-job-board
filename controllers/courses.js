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

            const newJobAssignments = req.body.assignments
            await Course.findByIdAndUpdate(req.params.id, {
                currentJobAssignments: newJobAssignments
            }, {
                upsert: false, 
                runValidators: true
            })

            // should I change this behavior if "new" job is the same?
            await Student.updateMany(
                {
                    enrolledInCourse: req.params.id
                }, 
                {
                    $set: {
                        "jobHistory.$[elemX].endedOn": new Date()
                    } 
                }, 
                {
                    arrayFilters: [
                        {
                            "elemX.endedOn": undefined
                        }
                    ],
                    upsert: false, 
                    runValidators: true
                }
            )

            await Promise.all(
                newJobAssignments.map(assignment => {
                    Student.findOneAndUpdate(
                        {
                            _id: assignment.student
                        },
                        {
                            $push: {
                                jobHistory: {
                                    title: assignment.job, 
                                    startedOn: new Date(),    
                                }
                            }
                        }, 
                        {
                            upsert: false, 
                            runValidators: true
                        }
                    ).exec()
                })
            )

            console.log(`Course Updated: assignJobs`)
            res.redirect(303, `/users/courses/${req.params.id}`)
        } catch(err) {
            console.log(err)
            req.flash('errors', { msg: 'Unable to assign jobs.' })
            res.redirect(303,  `/users/courses/${req.params.id}`)
        }
    },
}

