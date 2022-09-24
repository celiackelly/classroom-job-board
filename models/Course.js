const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    students: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true,
    },
    importedFromGoogle: {
        type: Boolean,
        default: false,
        required: true,
    },
    jobList: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job', 
        required: true, 
        default: [] 
    }],
    currentJobAssignments: [{
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        default: [] 
    }],
}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)