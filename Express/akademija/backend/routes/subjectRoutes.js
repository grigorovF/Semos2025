const express = require("express");
const router = express.Router();

const subjectController = require("../handlers/subjectHandler");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

router.post("/", protect, restrictTo("admin"), subjectController.createSubject);

router.get("/", protect, subjectController.getAllSubjects);

router.get("/:id", protect, subjectController.getSubject);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  subjectController.deleteSubject,
);

module.exports = router;
