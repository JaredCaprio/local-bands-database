const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  name: {
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
  address: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
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
    default: "open",
    enum: ["open", "temporarily closed", "permanently closed", "unknown"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Venue", VenueSchema);
