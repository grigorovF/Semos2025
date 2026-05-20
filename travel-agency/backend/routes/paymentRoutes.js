const express = require("express");

const router = express.Router();

const {
  createPaymentIntent,
  confirmInstallment,
} = require("../handlers/paymentHandler");

router.post("/create-intent", createPaymentIntent);

router.post("/confirm-installment", confirmInstallment);

module.exports = router;
