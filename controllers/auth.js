const express = require("express");
const bcrypt = require("bcryptjs");
const upload = require("../middleware/file-upload.js");

// ROUTER
const router = express.Router();

// MODEL
const User = require("../models/user.js");

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
      return res.status(422).send("Passwords didn't match");
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    if (req.body.isOrganiser === "on") {
      req.body.isOrganiser = true;
    } else {
      req.body.isOrganiser = false;
    }
    const newUser = await User.create(req.body);
    req.session.user = {
      username: newUser.username,
      _id: newUser._id,
      isOrganiser: newUser.isOrganiser,
    };
    req.session.save(() => {
      return res.redirect("/home");
    });
  } catch (error) {
    console.log(error);
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
      isOrganiser: existingUser.isOrganiser,
    };
    req.session.save(() => {
      return res.redirect("/home");
    });
    console.log(req.session.user);
  } catch (error) {
    console.log(error);
  }
});

// LOG OUT
router.get("/log-out", (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/home");
  });
});

// USER PROFILE
router.get("/profile", async (req, res) => {
  try {
    const userProfile = await User.findById(req.session.user._id).populate("likedVenues").populate("venuesCreated");
    return res.render("auth/profile.ejs", { profile: userProfile });
  } catch (error) {
    console.log(error);
  }
});

// EXPORT
module.exports = router;
