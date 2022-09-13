const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    enrolledInCourse: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: true,
    },
})

module.exports = mongoose.model('Student', studentSchema)