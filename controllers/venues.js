const express = require("express");
const mongoose = require("mongoose");
const upload = require("../middleware/file-upload.js");

// ROUTER
const router = express.Router();

// MODEL
const Venue = require("../models/venue.js");

// MIDDLEWARE
const authenticated = require("../middleware/authentication.js");

// CONTROLLERS
// NEW FORM
router.get("/new", authenticated (req, res) => {
  return res.render("venues/new.ejs");
});

// CREATE
router.post("/", authenticated, upload.single("logo"), async (req, res) => {
  try {
    console.log(req.body);
    if (req.file) {
      req.body.logo = req.file.path;
    }
    req.body.creator = req.session.user._id;
    const newVenue = await Venue.create(req.body);
    req.session.message = "Venue added successfully!";
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
    return res.status(500).send("Error");
  }
});

// SHOW
router.get("/:venueId", async (req, res, next) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.venueId)) {
      const venue = await Venue.findById(req.params.venueId).populate("creator").populate("feedback.user");
      if (!venue) return next();
      return res.render("venues/show.ejs", { venue });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

// EDIT FORM
router.get("/:venueId/edit", async (req, res, next) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.venueId)) {
      const editVenue = await Venue.findById(req.params.venueId);
      if (!editVenue) return next();
      if (!editVenue.creator.equals(req.session.user._id)) {
        return res.redirect(`/venues/${req.params.venueId}`);
      }
      return res.render("venues/edit.ejs", { venue: editVenue });
    }
    next();
  } catch (error) {
    console.log(error);
  }
});

// UPDATE
router.put("/:venueId", authenticated, upload.single("logo"), async (req, res) => {
  try {
    if (req.file) {
      req.body.logo = req.file.path;
    }
    const updateVenue = await Venue.findById(req.params.venueId);
    if (updateVenue.creator.equals(req.session.user._id)) {
      await Venue.findByIdAndUpdate(req.params.venueId, req.body, { returnDocument: "after" });
      req.session.message = "Venue updated successfully!";
      return res.redirect(`/venues/${req.params.venueId}`);
    }
    throw new Error("User cannot perform this action!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

// DELETE
router.delete("/:venueId", authenticated, async (req, res) => {
  try {
    const deleteVenue = await Venue.findById(req.params.venueId);
    if (deleteVenue.creator.equals(req.session.user._id)) {
      await Venue.findByIdAndDelete(req.params.venueId);
      req.session.message = "Venue deleted successfully!";
      return res.redirect("/venues");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

// FEEDBACK FORM
router.get("/:venueId/feedback", async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.venueId)) {
    const rateVenue = await Venue.findById(req.params.venueId);
    if (!rateVenue) return next();
    return res.render("venues/feedback.ejs", { venue: rateVenue });
  }
});

// POST FEEDBACK
router.post("/:venueId/feedback", authenticated, async (req, res, next) => {
  try {
    req.body.user = req.session.user._id;
    const rateVenue = await Venue.findById(req.params.venueId);
    if (!rateVenue) return next();
    console.log(req.body);
    rateVenue.feedback.push(req.body);
    req.session.message = "Feedback submitted successfully!";
    await rateVenue.save();
    return res.redirect(`/venues/${req.params.venueId}`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

// DELETE FEEDBACK
router.delete("/:venueId/feedback/:feedbackId", authenticated, async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.venueId);
    if (!venue) return next();
    const deleteFeedback = venue.feedback.id(req.params.feedbackId);
    if (!deleteFeedback) return next();
    if (!deleteFeedback.user.equals(req.session.user._id)) {
      throw new Error("User cannot perform this action!");
    }
    deleteFeedback.deleteOne();
    req.session.message = "Feedback deleted successfully!";
    await venue.save();
    return res.redirect("/auth/profile");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

// FAVOURITE A VENUE
router.post("/:venueId/favourite", async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.venueId);
    if (!venue) return next();
    venue.favourites.push(req.session.user._id);
    console.log(venue);
    await venue.save();
    return res.redirect(`/venues/${req.params.venueId}`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

// UNDO FAVOURITE
router.delete("/:venueId/favourite", async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.venueId);
    if (!venue) return next();
    venue.favourites.pull(req.session.user._id);
    await venue.save();
    return res.redirect(`/venues/${req.params.venueId}`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

// EXPORT
module.exports = router;
