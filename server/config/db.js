const mongoose = require("mongoose");
// const db = config.get("mongoURI");
require('dotenv').config()

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("db connecteddd");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
