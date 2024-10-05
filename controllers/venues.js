const express = require("express");
const mongoose = require("mongoose");

// ROUTER
const router = express.Router();

// MODEL
const Venue = require("../models/venue.js");

// MIDDLEWARE

// CONTROLLERS
// READ
router.get("/", async (req, res) => {
  try {
    return res.render("venues/index.ejs");
  } catch (error) {
    console.log(error);
  }
});

// NEW FORM
router.get("/new", async (req, res) => {
  try {
    return res.render("venues/new.ejs");
  } catch (error) {
    console.log(error);
  }
});
// EXPORT
module.exports = router;
