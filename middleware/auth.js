module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }, 
    ensureGuest: (req, res, next) => {
      if (req.isAuthenticated()) { 
          return res.redirect(`users/${req.user._id}/dashboard`)
      }
      next()
    }
}
  