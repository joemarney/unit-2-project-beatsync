const express = require("express");
const bcrypt = require("bcryptjs");

// ROUTER
const router = express.Router();

// MODEL
const User = require("../models/user");

// CONTROLLERS
// SIGN UP FORM
router.get("/sign-up", (req, res) => {
  return res.render("auth/sign-up-or-log-in.ejs");
});

// EXPORT
module.exports = router;
