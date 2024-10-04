const mongoose = require("mongoose");

// SCHEMA
const venueSchema = new mongoose.Schema({
  title: { type: String, required: ["Add a name", true], unique: true },
  location: { type: String, required: ["Add a location", true], unique: true },
  images: [String],
});

// MODEL
const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
