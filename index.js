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
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.urlencoded());
app.use(cookieParser());



//use static files
app.use(express.static("./assets"));

//makes the uploads path available to the brower
app.use("/uploads", express.static(__dirname + "/uploads"));
//use express layouts functionality
app.use(expressLayouts);

//extract style and scripts
//from sub pages into the  layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db
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

    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },

      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//it use the session cookies
app.use(flash());
app.use(customMware.setFlash);
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
