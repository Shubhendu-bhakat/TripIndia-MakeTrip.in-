const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema ,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be login first to create post");
    return res.redirect("/login");
  }
  next();
};
module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl)
  {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};



module.exports.isOwner =async  (req,res,next)=>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  console.log(listing.owner);
  if (!listing.owner.equals(res.locals.curUser._id)) {
    req.flash("error", "insuficient privilages to perform");
   return res.redirect(`/listings/${id}`);
  }
  next();
}



module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
    // let errmsg = err.details[0].message;
    // return next(new ExpressError(400, errmsg));
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
};


module.exports.isReviewauthor = async  (req,res,next)=>{
  let { reviewId , id } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.curUser._id)) {
    req.flash("error", "insuficient privilages to perform");
   return res.redirect(`/listings/${id}`);
  }
  next();
}
