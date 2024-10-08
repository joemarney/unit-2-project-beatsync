const mongoose = require("mongoose");

// SCHEMA
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: ["Please provide a username", true], unique: true },
    password: { type: String, required: ["Please provide a password", true] },
    isCreator: Boolean,
    avatar: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("likedVenues", {
  ref: "Venue",
  localField: "_id",
  foreignField: "favourites",
});

userSchema.virtual("feedbackGiven", {
  ref: "Venue",
  localField: "_id",
  foreignField: "feedback.user",
});

// MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
