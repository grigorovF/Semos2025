const Kurs = require("../pkg/schemas/kursSchema");

exports.addCours = async (req, res) => {
  try {
    const { ime, adresa, oblast } = req.body;

    const existingKurs = await Kurs.findOne({ ime });

    if (existingKurs) {
      return res.status(409).json({
        message: "Kursot vekje postoi",
      });
    }

    const kurs = await Kurs.create({
      ime,
      adresa,
      oblast,
    });

    res.status(201).json({
      message: "Kursot e kreiran",
      kurs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCoursById = async (req, res) => {
  try {
    const kurs = await Kurs.findById(req.params.id);

    if (!kurs) {
      return res.status(404).json({ message: "Kursot ne e pronajden" });
    }

    res.status(200).json(kurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCours = async (req, res) => {
  try {
    const { ime, adresa, oblast } = req.body;

    const kurs = await Kurs.findByIdAndUpdate(
      req.params.id,
      { ime, adresa, oblast },
      { new: true, runValidators: true },
    );

    if (!kurs) {
      return res.status(404).json({ message: "Kursot ne e pronajden" });
    }

    res.status(200).json({
      message: "Kursot e azuriran",
      kurs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCours = async (req, res) => {
  try {
    const kurs = await Kurs.findByIdAndDelete(req.params.id);

    if (!kurs) {
      return res.status(404).json({ message: "Kursot ne e pronajden" });
    }

    res.status(200).json({
      message: "Kursot e izbrishan",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};