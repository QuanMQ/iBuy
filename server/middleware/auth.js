module.exports = {
  authCheck: function (req, res, next) {
    if (!req.user) {
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated",
      });
    } else {
      next();
    }
  },
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("http://localhost:3000");
    }
  },
};
