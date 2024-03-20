const user = require("../models/user");
const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("user/signup.ejs");
};
module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const resUser = await User.register(newUser, password);
    req.login(resUser, (er) => {
      if (er) {
        return next(er);
      }
      req.flash("success", "Resistered succesfully!");
      res.redirect("/listings");
    });
  } catch (er) {
    req.flash("error", er.message);
    res.redirect("/signup");
  }
};
module.exports.renderLoginForm = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.logIn = async (req, res) => {
  req.flash("success", "welcome back to wonderLust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
  req.logout((er) => {
    if (er) {
      return next(er);
    }
    req.flash("success", "you are logged out now");
    res.redirect("/listings");
  });
};

module.exports.googleSignIn = async (req,res)=>{
  try {
    let {username,email} = req.body;
    const newUser = new User({email,username});
  } catch (error) {
    
  }
}
