const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

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

// *Routes
app.use("/auth", require("./routes/auth"));
app.use("/orders", require("./routes/orders"));

// *Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // *Set static folder
  app.use(express.static("public"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "public", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
