const express = require("express");
const port = 8000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    //inter-polation ->  ` `
    console.log(`Error in running the server : ${err}`);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
