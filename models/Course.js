const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    students: {
        type: Array,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true,
    },
    importedFromGoogle: {
        type: Boolean,
        default: false,
        required: true,
    },
})

module.exports = mongoose.model('Course', courseSchema)