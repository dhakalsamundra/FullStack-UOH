const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  favoriteGenre: {
    type: String,
  },
});


module.exports = mongoose.model("User", schema);
