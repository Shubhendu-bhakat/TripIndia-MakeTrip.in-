const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingControler = require("../controlers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

//post and get route for route listing
router
  .route("/")
  .get(wrapAsync(listingControler.index))
  .post(
    isLoggedin,
    upload.single("Listing[image]"),
    validateListing,
    wrapAsync(listingControler.createListing)
  );

//create newPost or list route
router.get("/new", isLoggedin, listingControler.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingControler.showListing))
  .put(
    isLoggedin,
    isOwner,
    upload.single("Listing[image]"),
    validateListing,
    wrapAsync(listingControler.updateListing)
  )
  .delete(isLoggedin, isOwner, wrapAsync(listingControler.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingControler.renderEditForm)
);

module.exports = router;
