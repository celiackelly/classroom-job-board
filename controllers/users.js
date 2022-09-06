const User = require('../models/User')

module.exports = {
    getDashboard: async (req, res) => {
        res.render('dashboard.ejs', { title: 'Dashboard' })
    }
}