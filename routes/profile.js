const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const { findOneAndUpdate } = require("../models/Band");
const profileController = require("../controllers/profile");

//@desc  Gets user data from Db and renders profile page
//@route  GET /profile/:id
router.get("/:id", ensureAuth, profileController.getProfilePage);

//@desc  Renders out edit Profile page
//@route  GET /profile/edit_profile/:id
router.get("/edit_profile/:id", ensureAuth, profileController.getEditProfile);

//@desc  Put request to update profile
//@route  PUT /profile/edit_profile/updateProfile/:id
router.put(
  "/edit_profile/updateProfile/:id",
  ensureAuth,
  profileController.updateProfile
);

module.exports = router;
