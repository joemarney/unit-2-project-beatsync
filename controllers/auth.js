const express = require("express");
const bcrypt = require("bcryptjs");
const upload = require("../middleware/file-upload.js");

// ROUTER
const router = express.Router();

// MODEL
const User = require("../models/user.js");
const authenticated = require("../middleware/authentication.js");

// CONTROLLERS
// SIGN UP FORM
router.get("/sign-up", (req, res) => {
  return res.render("auth/sign-up.ejs");
});

// SIGN UP
router.post("/sign-up", upload.single("avatar"), async (req, res) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.path;
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(422).send("Passwords did not match");
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.body.isCreator === "on") {
      req.body.isCreator = true;
    } else {
      req.body.isCreator = false;
    }
    const newUser = await User.create(req.body);
    req.session.user = {
      username: newUser.username,
      _id: newUser._id,
      isCreator: newUser.isCreator,
    };
    req.session.save(() => {
      return res.redirect("/home");
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      const uniqueUser = Object.entries(error.keyValue)[0];
      return res.status(422).send(`${uniqueUser[0]} "${uniqueUser[1]}" already in use`);
    } else {
      return res.status(500).render("auth/sign-up.ejs", { errors: error.errors });
    }
  }
});

// LOG IN FORM
router.get("/log-in", (req, res) => {
  return res.render("auth/log-in.ejs");
});

// LOG IN
router.post("/log-in", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser) {
      return res.status(401).send("Login failed");
    }
    if (!bcrypt.compareSync(req.body.password, existingUser.password)) {
      return res.status(401).send("Login failed");
    }
    req.session.user = {
      _id: existingUser._id,
      username: existingUser.username,
      isCreator: existingUser.isCreator,
    };
    req.session.save(() => {
      return res.redirect("/home");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

// LOG OUT
router.get("/log-out", (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/home");
  });
});

// USER PROFILE
router.get("/profile", authenticated, async (req, res) => {
  try {
    const userProfile = await User.findById(req.session.user._id).populate("likedVenues").populate("feedbackGiven");
    return res.render("auth/profile.ejs", { profile: userProfile });
  } catch (error) {
    console.log(error);
  }
});

// EXPORT
module.exports = router;
