const mongoose = require("mongoose");

// SCHEMA
const venueSchema = new mongoose.Schema({
  name: { type: String, required: ["Please provide a name", true], unique: true },
  description: { type: String, required: ["Please provide a description", true] },
  location: { type: String, required: ["Please provide a location", true], unique: true },
  logo: String,
});

// MODEL
const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
