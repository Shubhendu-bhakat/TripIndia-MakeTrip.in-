const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControler = require("../controlers/user.js");

router
  .route("/signup")
  .get(userControler.renderSignupForm)
  .post(wrapAsync(userControler.signUp));

router
  .route("/login")
  .get(userControler.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControler.logIn
  );
//logout route
router.get("/logout", userControler.logOut);

module.exports = router;
