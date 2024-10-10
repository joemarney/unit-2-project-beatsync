const mongoose = require("mongoose");

// SCHEMA
const feedbackSchema = new mongoose.Schema(
  {
    toilet: Number,
    smokeArea: Number,
    security: Number,
    soundSystem: Number,
    barPrices: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const venueSchema = new mongoose.Schema({
  name: { type: String, required: ["Please provide a name", true], unique: true },
  location: { type: String, required: ["Please provide a location", true], unique: true },
  description: { type: String, required: ["Please provide a description", true] },
  logo: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedback: [feedbackSchema],
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// MODEL
const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
