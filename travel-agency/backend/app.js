const express = require("express");
const sql = require("./db");
const env = require('dotenv');
const cookieParser = require("cookie-parser");

const app = express();
env.config();

app.use(express.json())
app.use(cookieParser());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
