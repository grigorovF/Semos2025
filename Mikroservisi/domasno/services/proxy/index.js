const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();

app.use(cors());

const authProxy = proxy("http://localhost:9000", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
});

const coursesProxy = proxy("http://localhost:9001", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/courses${req.url}`;
  },
});

app.use("/api/v1/auth", authProxy);

app.use("/api/v1/courses", coursesProxy);

app.listen(9002, () => {
  console.log("Proxy service running on 9002");
});
