const express = require("express");

const router = express.Router();

const aiController = require("../handlers/aiController");

router.post("/chat", aiController.chat);

module.exports = router;
