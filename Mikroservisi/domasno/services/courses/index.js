const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");

dotenv.config({
  path: `${__dirname}/../../config/config.env`,
});

const db = require("../../pkg/db");
const course = require("./handlers/courseHandler");

db.init();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/v1/courses"],
  }),
);

app.get("/api/v1/courses", course.getAll);

app.post("/api/v1/courses/me", course.create);

app.get("/api/v1/courses/me", course.getMine);

app.listen(process.env.PORTCOURSES, () => {
  console.log(`Courses service running on ${process.env.PORTCOURSES}`);
});
