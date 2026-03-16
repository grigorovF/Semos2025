const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./pkg/db/index");
const path = require("path");
const { protect, restrictTo } = require("./middelwares/auth.js");
const reservationRoutes = require("./handlers/routes/resrvations.js");
const userRoutes = require("./handlers/routes/users.js");
const landRoutes = require("./handlers/routes/lands.js");
const cityRoutes = require("./handlers/routes/cities");
const routeRoutes = require("./handlers/routes/routes.js")
const emailRoutes = require('./handlers/routes/email.js')

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/admin", protect, restrictTo("admin"), (req, res) => {
  res.render("admin", { user: req.user });
});

app.use('/password', emailRoutes);

app.get("/dashboard", protect, (req, res) => {
  res.render("dashboard", { user: req.user });
});

app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/lands", landRoutes);
app.use("/api/cities", cityRoutes);

app.use("api/routes", routeRoutes);

db.init();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

//forma za promena na password -mora prvo da prati token
app.get("/password", (req, res) =>{
  res.render("password");
});



app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log(`Service started successfully ${process.env.PORT}`);
});
