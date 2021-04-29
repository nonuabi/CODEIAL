const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongoDB"));

db.once("open", function () {
  console.log("We'r connected Database :: MongoDB");
});

module.exports = db;
