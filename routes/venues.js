const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Band = require("../models/Band");
const Venue = require("../models/Venue");
const venuesController = require("../controllers/venues");

//@desc finds all venues in collection sorted by name
//@route GET /venues
router.get("/", ensureAuth, venuesController.getVenues);

//@desc creates new venue in database
//@route POST /venues
router.post("/", ensureAuth, venuesController.createVenue);

//@desc updates a venue
//@route POST /venues/update/:id
router.put("/update/:id", ensureAuth, venuesController.updateVenue);

// @desc renders out venue add page
// @route GET /venues/add
router.get("/add", ensureAuth, venuesController.getAddVenue);

// @desc renders out a single venue page
// @route GET /venues/:id
router.get("/:id", ensureAuth, venuesController.getOneVenue);

// @desc renders edit page for single venue page
// @route GET /venues/edit/:id
router.get("/edit/:id", ensureAuth, venuesController.editVenue);

// @desc deletes a single venue page
// @route DELETE /venues/:id
router.delete("/:id", ensureAuth, venuesController.deleteVenue);

// @desc renders all venues created by given user
// @route GET /venues/user/:userid
router.get("/user/:userId", ensureAuth, venuesController.usersVenues);

// @desc search in db for venue from query
// @route GET /venues/search
router.post("/search", venuesController.searchVenue);

module.exports = router;
