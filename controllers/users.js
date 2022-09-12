const User = require('../models/User')
const Course = require('../models/Course')
const googleApi = require("../utils/google-api")

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const courses = await Course.find({user: req.user})
            res.render('dashboard', { title: 'Dashboard', user: req.user, courses})
        } catch(err) {
            console.log(err)
        }
    }
}