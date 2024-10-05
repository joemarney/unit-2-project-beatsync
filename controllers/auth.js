const express = require("express");
const bcrypt = require("bcryptjs");

// ROUTER
const router = express.Router();

// MODEL
const User = require("../models/user.js");

// CONTROLLERS
// SIGN UP FORM
router.get("/sign-up", (req, res) => {
  return res.render("auth/sign-up.ejs");
});

// LOG IN FORM
router.get("/log-in", (req, res) => {
  return res.render("auth/log-in.ejs");
});

// EXPORT
module.exports = router;
