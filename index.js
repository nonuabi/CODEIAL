const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const { pass } = require("./config/mongoose");

app.use(express.urlencoded());
app.use(cookieParser());

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

app.use(
  session({
    name: "codeial",
    //To Do change the secret before deploment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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
