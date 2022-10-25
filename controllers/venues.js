const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Band = require("../models/Band");

const Venue = require("../models/Venue");

module.exports = {
  //Renders all venues in database and sorts them by name A-Z
  getVenues: async (req, res) => {
    const venues = await Venue.find().populate("user").sort({ name: 1 }).lean();
    res.render("venues/index", {
      layout: "venue",
      venues,
      title: "All Venues",
    });
  },
  //Add a new venue to the database
  createVenue: async (req, res) => {
    try {
      req.body.user = req.user.id;
      const findVenue = await Venue.exists({
        name: req.body.name,
        city: req.body.city,
      });
      if (!findVenue) {
        await Venue.create(req.body);
        req.flash("venue_succ_msg", "Venue added");
        res.redirect("/venues");
      } else {
        req.flash("venue_error_msg", "Venue already exists");
        res.redirect("/venues/add");
      }
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
  //Renders update venue page
  updateVenue: async (req, res) => {
    try {
      let venue = await Venue.findById(req.params.id).lean();

      if (!venue) {
        return res.render("error/500");
      }
      if (venue.user != req.user.id) {
        res.redirect("/venues");
      } else {
        venue = await Venue.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        });
      }
      res.redirect("/venues");
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
  //renders the add venue page
  getAddVenue: (req, res) => {
    res.render("venues/add", { layout: "venue", title: "Add Venue" });
  },
  //Shows single venue page
  getOneVenue: async (req, res) => {
    try {
      const venue = await Venue.findOne({ _id: req.params.id })
        .populate("user")
        .lean();

      res.render("venues/show", { layout: "venue", venue, title: venue.name });
    } catch (error) {
      console.error(error);
      res.redirect("erorr/404");
    }
  },
  //Renders the edit venues page
  editVenue: async (req, res) => {
    try {
      const venue = await Venue.findOne({ _id: req.params.id }).lean();
      res.render("venues/edit", {
        layout: "venue",
        title: `${venue.name}`,
        venue,
      });
    } catch (error) {
      res.redirect("error/404");
      console.error(error);
    }
  },
  //Renders the delete venue page
  deleteVenue: async (req, res) => {
    console.log(req.params.id);
    try {
      await Venue.deleteOne({ _id: req.params.id });
      res.redirect("/venues");
    } catch (error) {
      res.redirect("error/404");
      console.error(error);
    }
  },
  //Renders out all venues created by the given user
  usersVenues: async (req, res) => {
    try {
      const venues = await Venue.find({
        user: req.params.userId,
      })
        .populate("user")
        .lean();

      res.render("venues/index", {
        venues,
        user: req.user,
      });
    } catch (err) {
      console.error(err);
      res.render("error/404");
    }
  },
  searchVenue: async (req, res) => {
    try {
      console.log(req.body.setStatus);
      const queryAllCaps = req.body.query.toUpperCase();
      const venues = await Venue.find({
        allCaps: { $regex: RegExp(queryAllCaps, "i") },
      })
        .populate("user")
        .sort({ name: 1 })
        .limit(50)
        .lean();
      res.render("venues/index", { venues });
    } catch (error) {
      res.render("error/404");
      console.error(error);
    }
  },
};
