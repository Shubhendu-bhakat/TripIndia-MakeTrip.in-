const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONG_URL = "mongodb://127.0.0.1:27017/wonderLust";
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((er) => {
    console.log(er);
  });

async function main() {
  await mongoose.connect(MONG_URL);
}

const initDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "65ac1a36e07abb3a6113eaf2",
  }));
  await Listing.insertMany(initData.data);
  console.log("data saved sucessfully");
};
initDb();
