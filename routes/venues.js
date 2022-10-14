const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Band = require("../models/Band");

const Venue = require("../models/Venue");

//@desc finds all venues in collection sorted by name
//@route GET /venues
router.get("/", ensureAuth, async (req, res) => {
  const venues = await Venue.find().populate("user").sort({ name: 1 }).lean();

  res.render("venues/index", {
    layout: "venue",
    venues,
    title: "All Venues",
  });
});

//@desc creates new venue in database
//@route POST /venues
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    const findVenue = await Venue.exists({
      name: req.body.name,
      city: req.body.city,
    });
    if (!findVenue) {
      await Venue.create(req.body);
      console.log("goodgoodnotbad");
      req.flash("venue_succ_msg", "Venue added");
      res.redirect("/venues");
    } else {
      console.log("badbadnotgood");
      req.flash("venue_error_msg", "Venue already exists");
      res.redirect("/venues/add");
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

//@desc updates a venue
//@route POST /venues/update/:id
router.put("/update/:id", ensureAuth, async (req, res) => {
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
});

// @desc renders out venue add page
// @route GET /venues/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("venues/add", { layout: "venue", title: "Add Venue" });
});

// @desc renders out a single venue page
// @route GET /venues/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const venue = await Venue.findOne({ _id: req.params.id })
      .populate("user")
      .lean();

    res.render("venues/show", { layout: "venue", venue, title: venue.name });
  } catch (error) {
    console.error(error);
    res.redirect("erorr/404");
  }
});

// @desc renders edit page for single venue page
// @route GET /venues/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
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
});

// @desc deletes a single venue page
// @route DELETE /venues/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    await Venue.deleteOne({ _id: req.params.id });
    res.redirect("/venues");
  } catch (error) {
    res.redirect("error/404");
    console.error(error);
  }
});

// @desc renders all venues created by given user
// @route GET /venues/user/:userid
router.get("/user/:userId", ensureAuth, async (req, res) => {
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
});

module.exports = router;
