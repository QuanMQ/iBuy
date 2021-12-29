module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("http://localhost:3000");
    }
  },
  ensureAd: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") {
      return next();
    } else {
      res.redirect("http://localhost:3000");
    }
  },
};
