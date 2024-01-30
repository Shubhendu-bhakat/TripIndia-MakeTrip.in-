const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedin, isReviewauthor} = require("../middleware.js");
const reviewController = require("../controlers/review.js");
//reviews route
//route for new review for a hotel
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.createReview)
);
//review delete route
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewauthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
