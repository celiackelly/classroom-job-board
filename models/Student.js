const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
    },
    lastName: { 
        type: String
    },
    enrolledInCourse: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: true,
    },
    currentJob: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Job', 
    },
    //not quite sure how to model jobHistory yet...
    jobHistory: [{
        jobHeld: { 
            type: mongoose.Schema.Types.ObjectId, ref: 'Job', 
            required: true }, 
        startedOn: Date, 
        endedOn: Date
    }]
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)