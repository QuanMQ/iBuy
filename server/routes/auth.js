const express = require("express");
const passport = require("passport");
const router = express.Router();

// *@desc Returns login success response with user information
// *@route GET /auth/success
router.get("/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// *@desc Auth with Google
// *@route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// *@desc Google auth callback
// *@route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/shop",
    failureRedirect: "http://localhost:3000/failed",
  })
);

// *@desc Logout user
// *@route GET /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

module.exports = router;
