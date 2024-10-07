const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");
require("dotenv/config");

const app = express();
const port = 3000;

// IMPORTS
const venuesController = require("./controllers/venues.js");
const authController = require("./controllers/auth.js");
const userEverywhere = require("./middleware/user-everywhere.js");
const seeErrors = require("./middleware/errors.js");
const initFlashMessage = require("./middleware/init-flash-message.js");

// MIDDLEWARE
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
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
app.use(seeErrors);
app.use(initFlashMessage);

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

// SEARCH
app.get("/search", async (req, res) => {
  try {
    return res.render("search.ejs");
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
