const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Band = require("../models/Band");
const { findOneAndUpdate } = require("../models/Band");

const User = require("../models/User");

//@desc  Gets user data from Db and renders profile page
//@route  GET /profile/:id
router.get("/:id", ensureAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).lean();
  const bands = await Band.find({ user: req.params.id }).lean().limit(50);

  res.render("profile/profile", {
    layout: "profile",
    user,
    loggedUser: req.user,
    bands,
  });
});

//@desc  Renders out edit Profile page
//@route  GET /profile/edit_profile/:id
router.get("/edit_profile/:id", ensureAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).lean();

  console.log(user.birthday);

  res.render("profile/edit_profile", {
    layout: "profile",
    user,
  });
});

//@desc  Put request to update profile
//@route  PUT /profile/edit_profile/updateProfile/:id
router.put("/edit_profile/updateProfile/:id", ensureAuth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id).lean();
    if (!user) {
      res.render("error/404");
    }
    let stringUserId = user._id.toString();
    let reqStringUserId = req.user._id.toString();

    if (stringUserId != reqStringUserId) {
      console.log("wrong");
      res.redirect("/bands");
    } else {
      if (req.body.showBirthday) {
        req.body.showBirthday = true;
      } else {
        req.body.showBirthday = false;
      }
      if (req.body.showAge) {
        req.body.showAge = true;
      } else {
        req.body.showAge = false;
      }
      user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      console.log("suck cess");
      res.redirect(`/profile/${stringUserId}`);
    }
  } catch (error) {
    console.error(error);
    res.redirect("/bands");
  }
});

module.exports = router;
