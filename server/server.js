const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const { authCheck } = require("./middleware/auth");

// *Load config
dotenv.config({ path: "./config/config.env" });

// *Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

// *Enable cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// *Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// *Method override
app.use(methodOverride("_method"));

// *Sessions
app.use(
  cookieSession({
    name: "session",
    keys: ["thisappisawesome"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// *Parse cookies
app.use(cookieParser());

// *Passport middleware
app.use(passport.initialize());

// *Deserialize cookie from the browser
app.use(passport.session());

// *Static folder
// app.use(express.static(path.join(__dirname, "..", "client", "public")));

// *Routes
// app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
// app.use("/stories", require("./routes/stories"));

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
