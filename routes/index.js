const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const indexController = require("../controllers/index");

// @desc  Login/landing page
// @route GET /

router.get("/", ensureGuest, indexController.getLogin);

// @desc  dashboard
// @route GET /dashbord

router.get("/dashboard", ensureAuth, indexController.getDashboard);

module.exports = router;
