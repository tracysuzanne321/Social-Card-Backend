const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully Connected!");
  } catch (error) {
    console.log(error);
  }
};

connection();
