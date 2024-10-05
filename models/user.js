const mongoose = require("mongoose");

// SCHEMA
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isOrganiser: Boolean,
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
  foreignField: "likes",
});

userSchema.virtual("venuesCreated", {
  ref: "Venue",
  localField: "_id",
  foreignField: "organiser",
});

// MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
