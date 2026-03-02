const express = require("express");
const userController = require("../handlers/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/rezervacii", auth.protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
