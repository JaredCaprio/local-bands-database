const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const bandsController = require("../controllers/bands");

// @desc  show add page
// @route GET /bands/add
router.get("/add", ensureAuth, bandsController.getAdd);

// @desc  process add form
// @route GET /bands
router.post("/", ensureAuth, bandsController.processAdd);

// @desc  show all bands
// @route GET /bands
router.get("/", ensureAuth, bandsController.showBands);

// @desc  show single band
// @route GET /bands/:id
router.get("/:id", ensureAuth, bandsController.showOneBand);

// @desc  show edit page
// @route GET /bands/edit/:id
router.get("/edit/:id", ensureAuth, bandsController.showEditBand);

// @desc  update band
// @route PUT /bands/:id
router.put("/:id", ensureAuth, bandsController.updateBand);

// @desc  Delete band
// @route DELETE /bands/:id
router.delete("/:id", ensureAuth, bandsController.deleteBand);

// @desc  Displays bands create by the given user
// @route GET /bands/user/:userId
router.get("/user/:userId", ensureAuth, bandsController.usersBands);

// @desc  Query Database and return results
// @route GET /bands-search
router.post("/search", ensureAuth, bandsController.searchBand);

module.exports = router;
