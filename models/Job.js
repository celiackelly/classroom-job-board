const mongoose = require('mongoose')

//add in optional picture? 
//public/sharing functions - use Mongoose model.discriminator() ?

const jobSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    duties: {
        type: [String],
        required: true,
    },
    // gradeLevels: {
    //     type: [{ type: String }],
    //     required: true,
    // },
    // isPublic: {
    //     type: Boolean,
    //     default: false,
    //     required: true,
    // },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    // },
})

module.exports = mongoose.model('Job', jobSchema)
 