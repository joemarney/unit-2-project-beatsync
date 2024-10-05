const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");
require("dotenv/config");

const app = express();
const port = 3000;

// IMPORT
const venuesController = require("./controllers/venues.js");
const authController = require("./controllers/auth.js");
const userEverywhere = require("./middleware/user-everywhere.js");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
app.use(userEverywhere);
app.use("/uploads", express.static("uploads"));

// LANDING PAGE/LOADING SCREEN
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// HOME PAGE
app.get("/home", (req, res) => {
  try {
    res.render("home.ejs");
  } catch (error) {
    console.log(error);
  }
});

// ROUTERS
app.use("/venues", venuesController);
app.use("/auth", authController);

// 404 HANDLER
app.get("*", (req, res) => {
  res.render("404.ejs");
});

// SERVER
const serverStartUp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection established");
    app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error, "Server could not be started");
  }
};

serverStartUp();
