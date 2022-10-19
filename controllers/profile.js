const express = require("express");
const Band = require("../models/Band");
const User = require("../models/User");
const { findOneAndUpdate } = require("../models/Band");

module.exports = {
  getProfilePage: async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).lean();
    const bands = await Band.find({ user: req.params.id }).lean().limit(50);

    res.render("profile/profile", {
      layout: "profile",
      user,
      loggedUser: req.user,
      bands,
    });
  },
  getEditProfile: async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).lean();
    res.render("profile/edit_profile", {
      layout: "profile",
      user,
    });
  },
  updateProfile: async (req, res) => {
    try {
      let user = await User.findById(req.params.id).lean();
      if (!user) {
        res.render("error/404");
      }
      let stringUserId = user._id.toString();
      let reqStringUserId = req.user._id.toString();

      if (stringUserId != reqStringUserId) {
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
        res.redirect(`/profile/${stringUserId}`);
      }
    } catch (error) {
      console.error(error);
      res.redirect("/bands");
    }
  },
};
