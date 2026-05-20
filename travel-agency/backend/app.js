const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({path: './config.env'});
require("./db");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))


app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/payment-routes", require("./routes/paymentRoutes"));
//app.use("/api/reservation-routes", require("./routes/reservationRoutes"));
app.use("/api/route-routes", require("./routes/routeRoutes"));
app.use("/api/trip-routes", require("./routes/tripRoutes"));
app.use("/api/user-rioutes", require("./routes/userRoutes"));


//handlers
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
