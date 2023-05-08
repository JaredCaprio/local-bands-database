const passport = require("passport");
const express = require("express");
const User = require("../models/User");

exports.authGoogle = (req, res) => {
  passport.authenticate("google", { scope: ["profile"] });
};

exports.googleCallback = (req, res) => {
  passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/dashboard");
    };
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
