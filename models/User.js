const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

//Change this to TEACHER here and everywhere? Including in route, controller
const userSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String},
  email: { type: String, unique: true, required: true},
  password: String, 
  googleId: String,
  tokens: Array
})


// Password hash middleware.
 
 userSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


module.exports = mongoose.model('User', userSchema)
