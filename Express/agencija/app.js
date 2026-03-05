const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./pkg/db/index");
const trips = require("./handlers/tirps/trips");
const reservationRoutes = require("./routes/reservations");

app.use("/api/reservations", reservationRoutes);