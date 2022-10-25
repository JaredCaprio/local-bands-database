const mongoose = require("mongoose");

const BandSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  allCaps: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "hiatus", "split-up", "unknown"],
  },
  socialmedia: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Band", BandSchema);
