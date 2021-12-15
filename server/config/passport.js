const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const Buyer = require("../models/Buyer");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        const newBuyer = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let buyer = await Buyer.findOne({ googleId: profile.id });

          if (buyer) {
            done(null, buyer);
          } else {
            buyer = await Buyer.create(newBuyer);
            done(null, buyer);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((buyer, done) => {
    done(null, buyer.id);
  });

  passport.deserializeUser((id, done) => {
    Buyer.findById(id, (err, buyer) => done(err, buyer));
  });
};
