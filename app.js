if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// const MONG_URL = "mongodb://127.0.0.1:27017/wonderLust";
const dburl = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((er) => {
    console.log(er);
  });

async function main() {
  await mongoose.connect(dburl);
}
//view engne and ejs settings and oparse of data so that can be read
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const store = MongoStore.create({
  mongoUrl:dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter:24*3600,
});
store.on("error",()=>{
  console.log("Error in mongoStore");
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

//flash should be used before the routes require
app.use(session(sessionOptions));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
//session should be inmplimented before using the local pasport as the use
//user should be in one seassion only;

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success = req.flash("success"); //as argument we should have success beacuse it is case senitive arg
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user;
  next();
});

// app.get("/demouser",async(req,res)=>{
//   let fakeUser = new User({
//     email:"student1@gmail.com",
//     username:"delta-student"
//   });
//   let registeredUser = await User.register(fakeUser,"hellowworld");
//   res.send(registeredUser);
// })

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

//if the user sends a request on any api/route which does not exsisites
//then in that case we are sending a standered result that is page not found.
//so,

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found"));
});

//error handeling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  console.log({ err });
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("server is at port 8080 ");
});
