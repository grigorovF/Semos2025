require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./pkg/db");

const app = express();

db.init();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/animals", require("./routes/animalRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
