require("dotenv").config({ path: "./config.env" });

const db = require("./pkg/db/index");
const express = require("express");

const turiRoutes = require("./routes/turiRoutes");
const userRoutes = require("./routes/userRoutes");

db.init();

const app = express();
app.use(express.json());

app.use("/api/turi", turiRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
