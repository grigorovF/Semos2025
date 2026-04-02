const { protect, restrictTo } = require("../middlewares/authMiddleware");

router.post("/", protect, restrictTo("admin"), programController.addProgram);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  programController.deleteProgram,
);
