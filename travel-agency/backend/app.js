const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
require("./db");
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("api/trips", require("./handlers/tripHandler"));
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
