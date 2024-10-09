const mongoose = require("mongoose");
require("dotenv/config");

const Venue = require("../models/venue.js");
const User = require("../models/user.js");

const venueData = require("./data/venues.js");
const userData = require("./data/users.js");

const plantSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection established");
    const clearDb = await Venue.deleteMany();
    console.log(`${clearDb.deletedCount} Venues removed`);
    const clearUsers = await User.deleteMany();
    console.log(`${clearUsers.deletedCount} Users removed`);
    const users = await User.create(userData);
    console.log(`${users.length} Users added`);
    const creators = venueData.map((venue) => {
      venue.creator = users[Math.floor(Math.random() * users.length)]._id;
      return venue;
    });
    const venue = await Venue.create(creators);
    console.log(`${venue.length} Venues added`);
    await mongoose.connection.close();
    console.log("Database connection killed");
  } catch (error) {
    console.log(error);
  }
};

plantSeed();
