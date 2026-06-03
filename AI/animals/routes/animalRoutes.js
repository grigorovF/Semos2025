const express = require("express");
const router = express.Router();

const animalHandler = require("../handlers/animalHandler");

router.post("/add", animalHandler.createAnimal);
router.get("/", animalHandler.getAllAnimals);
router.post("/ask", animalHandler.askAboutAnimals);
router.get("/:id", animalHandler.getAnimal);
router.put("/:id", animalHandler.updateAnimal);
router.delete("/:id", animalHandler.deleteAnimal);

module.exports = router;