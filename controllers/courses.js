const Course = require('../models/Course')
const Student = require('../models/Student')
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
            console.log(course)
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
    editJobList: async (request, response) => {
        try {
            await Course.findByIdAndUpdate(request.params.id, {
                //put updates from form here
            }, {
                upsert: false, 
                runValidators: true
            })
            console.log(`Course Updated: editJobList`)
            //By default, Express uses HTTP 302 for redirect, but this prevents PUT/POST requests from being redirected, 
            //so you have to set the code to 303
            //https://expressjs.com/en/api.html#res.redirect - also note the leading vs. trailing slashes
            response.redirect(303, '/users/dashboard')
        } catch(err) {
            console.log(err)
            response.redirect(303, '/users/dashboard')
        }
    },


        // deleteDish: async (request, response) => {
    //     try {
    //         //Find the Dish where _id matches request.params.id and delete it
    //         await Dish.findByIdAndDelete(request.params.id)
    //         console.log('Dish Deleted')
    //         response.redirect(303, `/users/${request.user._id}/dashboard`)
    //     } catch(err) {
    //         console.log(err)
    //         response.redirect(303, `/users/${request.user._id}/dashboard`)
    //     }
    // }, 
}

