const express = require("express");
const { populate } = require("../models/User");
const Band = require("../models/Band");
const Venue = require("../models/Venue");

module.exports = {
  getLogin: (req, res) => {
    res.render("login", {
      layout: "login",
    });
  },
  getDashboard: async (req, res) => {
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
  },
};
