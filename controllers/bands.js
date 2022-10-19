const Band = require("../models/Band");
const User = require("../models/User");
const { ensureAuth } = require("../middleware/auth");

module.exports = {
  //Renders out the add band page
  getAdd: (req, res) => {
    res.render("bands/add");
  },
  //Process add form and creates new document in database
  processAdd: async (req, res) => {
    try {
      req.body.user = req.user.id;
      const findBand = await Band.exists({
        name: req.body.name,
        city: req.body.city,
      });
      console.log(req.body);
      console.log(findBand);
      if (!findBand) {
        await Band.create(req.body);
        req.flash("band_succ_msg", "Band added");
        res.redirect("/dashboard");
      } else {
        req.flash("band_error_msg", "Band already exists");
        res.redirect("bands/add");
      }
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },
  //Shows all bands in database
  showBands: async (req, res) => {
    try {
      const bands = await Band.find()
        .populate("user")
        .sort({ artist: 1 })
        .lean();
      res.render("bands/index", {
        bands,
        title: "All Bands",
      });
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },
  //Show single band page
  showOneBand: async (req, res) => {
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
  },
  //Render out edit page for bands
  showEditBand: async (req, res) => {
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
  },
  //Update bands
  updateBand: async (req, res) => {
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
  },
  //Deletes one band
  deleteBand: async (req, res) => {
    try {
      await Band.deleteOne({ _id: req.params.id });
      res.redirect("/bands");
    } catch (err) {
      console.error(err);
      return res.render("error/404");
    }
  },
  //Displays all bands by the given user
  usersBands: async (req, res) => {
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
  },
  searchBand: async (req, res) => {
    try {
      const queryAllCaps = req.body.query.toUpperCase();
      const bands = await Band.find({
        allCaps: { $regex: RegExp(queryAllCaps, "i") },
      })
        .populate("user")
        .sort({ artist: 1 })
        .limit(50)
        .lean();
      res.render("bands/index", { bands });
    } catch (error) {
      res.render("error/404");
      console.error(error);
    }
  },
};
