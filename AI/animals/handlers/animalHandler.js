const Animal = require("../pkg/animalsSchema");
const { chatWithAI } = require("./aiSystem");

exports.createAnimal = async (req, res) => {
  try {
    const animal = await Animal.create(req.body);

    res.status(201).json({
      status: "success",
      data: animal,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();

    res.status(200).json({
      status: "success",
      results: animals.length,
      data: animals,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    res.json(animal);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(animal);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.askAboutAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();

    const context = animals
      .map(
        (a) =>
          `
  Name: ${a.name}
  Species: ${a.species}
  Habitat: ${a.habitat}
  Diet: ${a.diet}
  Lifespan: ${a.lifespan}
  Weight: ${a.weight}
  Description: ${a.description}
  `,
      )
      .join("\n");

    const prompt = `
  You are an animal expert.
  
  Database animals:
  
  ${context}
  
  User question:
  ${req.body.prompt}
  `;

    const answer = await chatWithAI(prompt);

    res.json(answer);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

