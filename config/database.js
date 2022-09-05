const mongoose = require('mongoose')

const dbConnection = mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
  })
  .then(conn => conn.connection.getClient())
  .catch(err => 
    console.error(err)
)

module.exports = dbConnection
