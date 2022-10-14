const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Band = require("../models/Band");
const { populate } = require("../models/User");
const Venue = require("../models/Venue");

// @desc  Login/landing page
// @route GET /

router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc  dashboard
// @route GET /dashbord

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const bands = await Band.find({ user: req.user.id })
      .populate("user")
      .lean();
    const venues = await Venue.find({ user: req.user.id })
      .populate("user")
      .lean();
    res.render("dashboard", {
      name: req.user.firstName,
      image: req.user.image,
      id: req.user._id,
      bands,
      venues,
      title: "Dashboard",
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
