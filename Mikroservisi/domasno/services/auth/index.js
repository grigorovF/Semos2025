const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: `${__dirname}/../../config/config.env`,
});

const db = require("../../pkg/db");
const auth = require("./handlers/authHandler");

db.init();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/v1/auth/register", auth.register);
app.post("/api/v1/auth/login", auth.login);

app.listen(process.env.PORTAUTH, () => {
  console.log(`Auth service running on ${process.env.PORTAUTH}`);
});
