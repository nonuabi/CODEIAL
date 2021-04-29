const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//use express layouts functionality
app.use(expressLayouts);

//extract style and scripts
//from sub pages into the  layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//use static files
app.use(express.static("./assets"));

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    //inter-polation ->  ` `
    console.log(`Error in running the server : ${err}`);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
