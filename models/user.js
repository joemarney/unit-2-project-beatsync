const mongoose = require("mongoose");

// SCHEMA
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
  foreignField: "likes",
});

userSchema.virtual("venuesCreated", {
  ref: "Venue",
  localField: "_id",
  foreignField: "creator",
});

// MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
