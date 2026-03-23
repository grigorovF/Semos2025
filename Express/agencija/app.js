const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./pkg/db/index");
const path = require("path");

const { protect, restrictTo } = require("./middelwares/auth.js");

const reservationRoutes = require("./handlers/routes/resrvations.js");
const userRoutes = require("./handlers/routes/users.js");
const cityRoutes = require("./handlers/routes/cities");
const routeRoutes = require("./handlers/routes/routes.js");
const authRoutes = require("./handlers/routes/auth");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/admin", protect, restrictTo("admin"), (req, res) => {
  res.render("admin", { user: req.user });
});


app.get("/resetPassword/:token", (req, res) => {
  res.render("resetPassword", { token: req.params.token });
});

app.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword");
});

app.get("/user", protect, (req, res) => {
  res.render("user", { user: req.user });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/routes", routeRoutes);



db.init();

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log(`Service started successfully ${process.env.PORT}`);
});
