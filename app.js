const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const path = require("path");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const { allowedNodeEnvironmentFlags } = require("process");
const methodOverride = require("method-override");
const cors = require("cors");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//Load config
dotenv.config({ path: "./env/config.env" });

//suppress mongoose deprecation warning
mongoose.set("strictQuery", true);

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    console.log("Multer Error:", err);
  } else {
    console.log("Error:", err);
  }
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//handlebars helpers
const {
  formatDate,
  truncate,
  stripTags,
  editIcon,
  select,
  stripUrl,
  deleteIcon,
  profileEditIcon,
  calculateAge,
  searchQuery,
} = require("./healpers/hbs");

//Handlebars

app.engine(
  ".hbs",
  exphbs.engine({
    helpers: {
      formatDate,
      truncate,
      stripTags,
      editIcon,
      select,
      stripUrl,
      deleteIcon,
      profileEditIcon,
      calculateAge,
      searchQuery,
    },
    defaultLayout: "main",
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", ".hbs");

//session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// connect-flash and cookie parser config
app.use(cookieParser("SuperSecretStringForCookies"));
app.use(flash());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.venue_error_msg = req.flash("venue_error_msg");
  res.locals.band_error_msg = req.flash("band_error_msg");
  res.locals.band_succ_msg = req.flash("band_succ_msg");
  res.locals.venue_succ_msg = req.flash("venue_succ_msg");
  res.locals.file_type_err_msg = req.flash("file_type_error_msg");
  next();
});

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/bands", require("./routes/bands"));
app.use("/profile", require("./routes/profile"));
app.use("/venues", require("./routes/venues"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`);
});
