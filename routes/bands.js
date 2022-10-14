const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Band = require("../models/Band");
const User = require("../models/User");

// @desc  show add page
// @route GET /bands/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("bands/add");
});

// @desc  process add form
// @route GET /bands
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    const findBand = await Band.exists({
      name: req.body.name,
      city: req.body.city,
    });
    console.log(findBand);
    if (!findBand) {
      await Band.create(req.body);
      req.flash("band_succ_msg", "Band added");
      res.redirect("/dashboard");
      console.log("goodgoodnotbad");
    } else {
      console.log("badbadnotgood");
      req.flash("band_error_msg", "Band already exists");
      res.redirect("bands/add");
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc  show all bands
// @route GET /bands
router.get("/", ensureAuth, async (req, res) => {
  try {
    const bands = await Band.find().populate("user").sort({ artist: 1 }).lean();
    res.render("bands/index", {
      bands,
      title: "All Bands",
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc  show single band
// @route GET /bands/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let band = await Band.findById(req.params.id).populate("user").lean();

    if (!band) {
      return res.render("error/404");
    }

    res.render("bands/show", {
      band,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
});

// @desc  show edit page
// @route GET /bands/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const band = await Band.findOne({
      _id: req.params.id,
    }).lean();

    if (!band) {
      return res.render("error/404");
    }

    if (band.user != req.user.id) {
      res.redirect("/bands");
    } else {
      res.render("bands/edit", {
        band,
        title: `${band.artist}`,
      });
    }
  } catch (err) {
    console.error(err);
    res.redirect("error/404");
  }
});

// @desc  update band
// @route PUT /bands/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let band = await Band.findById(req.params.id).lean();

    if (!band) {
      return res.render("error/404");
    }
    if (band.user != req.user.id) {
      res.redirect("/bands");
    } else {
      band = await Band.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc  Delete band
// @route DELETE /bands/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Band.deleteOne({ _id: req.params.id });
    res.redirect("/bands");
  } catch (err) {
    console.error(err);
    return res.render("error/404");
  }
});

// @desc  User Bands
// @route GET /bands/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const bands = await Band.find({
      user: req.params.userId,
    })
      .populate("user")
      .lean();

    res.render("bands/index", {
      bands,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
});

// @desc  Get bands search query
// @route GET /bands/getBands
router.post("/getBands", async (req, res) => {
  let payload = req.body.payload;
  let search = await Band.find({
    artist: { $regex: new RegExp("^" + payload + ".*", "i") },
  })
    .lean()
    .exec();
  res.render("bands/index", { payload: search });
  console.log(payload, search);
});

module.exports = router;
