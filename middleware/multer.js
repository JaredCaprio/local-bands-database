const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({ limit: 1048576 }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(false, false);
      return;
    }
    cb(null, true);
  },
});
