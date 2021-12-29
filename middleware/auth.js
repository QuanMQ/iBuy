module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("https://ibuy-quanmq.herokuapp.com");
    }
  },
  ensureAd: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") {
      return next();
    } else {
      res.redirect("https://ibuy-quanmq.herokuapp.com");
    }
  },
};
