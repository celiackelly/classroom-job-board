const mongoose = require('mongoose')

//add in optional picture? 
//public/sharing functions - use Mongoose model.discriminator() ?

const jobSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String,
        maxLength: 300,         //add a validator message?
        required: true,
    },
    gradeLevels: {
        type: [{ type: String }],
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    },
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)

//What to do about the timestamps for jobs I add by batch JSON import? 