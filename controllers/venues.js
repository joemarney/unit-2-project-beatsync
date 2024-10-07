const express = require("express");
const mongoose = require("mongoose");
const upload = require("../middleware/file-upload.js");

// ROUTER
const router = express.Router();

// MODEL
const Venue = require("../models/venue.js");

// MIDDLEWARE

// CONTROLLERS
// NEW FORM
router.get("/new", async (req, res) => {
  return res.render("venues/new.ejs");
});

// CREATE
router.post("/", upload.single("logo"), async (req, res) => {
  try {
    console.log(req.body);
    if (req.file) {
      req.body.logo = req.file.path;
    }
    req.body.organiser = req.session.user._id;
    const newVenue = await Venue.create(req.body);
    req.session.message = "Venue Registered Successfully";
    req.session.save(() => {
      return res.redirect("/venues");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render("venues/new.ejs", {
      errors: error.errors,
      values: req.body,
    });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const venues = await Venue.find();
    return res.render("venues/index.ejs", { venues: venues });
  } catch (error) {
    console.log(error);
  }
});

// SHOW
router.get("/:venueId", async (req, res, next) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.venueId)) {
      const venue = await Venue.findById(req.params.venueId).populate("organiser").populate("feedback.user");
      if (!venue) return next();
      return res.render("venues/show.ejs", { venue });
    }
    next();
  } catch (error) {
    console.log(error);
  }
});

// EDIT FORM
router.get("/:venueId/edit", async (req, res, next) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.venueId)) {
      const editVenue = await Venue.findById(req.params.venueId);
      if (!editVenue) return next();
      return res.render("venues/edit.ejs", { venue: editVenue });
    }
  } catch (error) {
    console.log(error);
  }
});

// UPDATE
router.put("/:venueId"),
  upload.single("logo"),
  async (req, res) => {
    try {
      const updateVenue = await Venue.findById(req.params.venueId);
      if (updateVenue.organiser.equals(req.session.user._id)) {
        await Venue.findByIdAndUpdate(req.params.venueId, req.body);
      }
      return res.redirect(`/venues/${req.params.venueId}`);
    } catch (error) {
      console.log(error);
    }
  };

// EXPORT
module.exports = router;
