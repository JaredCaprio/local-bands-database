const Band = require("../models/Band");
const User = require("../models/User");
const { ensureAuth } = require("../middleware/auth");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  //Renders out the add band page
  getAdd: (req, res) => {
    res.render("bands/add", { title: "Add band" });
  },
  //Process add form and creates new document in database
  processAdd: async (req, res) => {
    try {
      req.body.user = req.user.id;
      const findBand = await Band.exists({
        artist: req.body.artist,
        city: req.body.city,
      });

      if (!findBand && req.file !== undefined) {
        const imgUpload = await cloudinary.uploader.upload(req.file.path, {
          folder: "local-bands-database",
        });

        let reducedImg = cloudinary.image(imgUpload.secure_url, {
          width: 400,
          alt: req.body.artist,
          class: "materialboxed",
        });
        const newBand = await Band.create({
          artist: req.body.artist,
          state: req.body.state,
          city: req.body.city,
          genre: req.body.genre,
          user: req.user.id,
          status: req.body.status,
          socialmedia: req.body.socialmedia,
          image: reducedImg,
          cloudinaryId: imgUpload.public_id,
        });
        req.flash("band_succ_msg", "Band added");
        res.redirect(`/bands/${newBand._id}`);
      } else if (req.file === undefined) {
        req.flash("file_type_err_msg", "File Type Not Supported");
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
        title: band.artist,
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
      let updatedInfo = req.body;

      if (!band) {
        return res.json(false);
      }
      if (band.user.toString() != req.user.id) {
        res.json(false);
      } else {
        if (req.file) {
          const imgUpload = await cloudinary.uploader.upload(req.file.path, {
            folder: "local-bands-database",
          });

          const destroyImg = await cloudinary.uploader.destroy(
            band.cloudinaryId
          );

          band.cloudinaryId = imgUpload.public_id;
          let image = cloudinary.image(imgUpload.secure_url, {
            width: 400,
            alt: `${req.body.artist} image`,
            class: "materialboxed",
          });

          updatedInfo = {
            ...req.body,
            image,
            cloudinaryId: imgUpload.public_id,
          };
        }
        band = await Band.findOneAndUpdate(
          { _id: req.params.id },
          updatedInfo,
          {
            new: true,
            runValidators: true,
          }
        );
        res.json(true);
      }
    } catch (err) {
      console.error(err);
      req.flash("file_type_err_msg", "File Type Not Supported");
      return res.redirect("/dashboard");
    }
  },

  //Deletes one band
  deleteBand: async (req, res) => {
    try {
      let band = await Band.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(band.cloudinaryId);

      await Band.deleteOne({ _id: req.params.id });
      res.redirect("/dashboard");
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
      const findBy = req.body.searchBy;
      let query = req.body.query;
      let status = req.body.status;
      if (/[a-zA-Z0-9]/g.test(query)) {
        query = req.body.query;
      }
      if (req.body.status === "any") {
        status = ".";
      }
      const bands = await Band.find({
        [findBy]: { $regex: RegExp(query, "i") },
        status: { $regex: RegExp(status, "i") },
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
