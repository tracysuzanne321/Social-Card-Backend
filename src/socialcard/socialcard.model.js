const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const cardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  cardname: {
    type: String,
    required: true,
  },
  cardprofile: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
