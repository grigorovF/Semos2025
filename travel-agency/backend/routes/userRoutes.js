const express = require("express");
const router = express.Router();

const { register,
    login,
    forgotPassword,
    passwordReset
} = require("../handlers/userHandlers");

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", passwordReset);

module.exports = router;
