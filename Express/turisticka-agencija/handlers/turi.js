const mongoose = require("mongoose");
const Tura = require("../pkg/turi/turiSchema");
const Rezervacija = require("../pkg/rezervacija/rezervacijaSchema");

exports.createTura = async (req, res) => {
  try {
    const tura = await Tura.create(req.body);
    res.status(201).json(tura);
    console.log("Vleguva");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTuri = async (req, res) => {
    try {
      if (req.user.role === "admin") {
        const turi = await Tura.find();
        return res.status(200).json(turi);
      }
      const user = await req.user.populate("rezerviraniTuri");

      res.status(200).json(user.rezerviraniTuri);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

exports.getOneTura = async (req, res) => {
  try {
    const tura = await Tura.findById(req.params.id);
    if (!tura) {
      return res.status(404).json({ 
        status: "fail",
        message: "Turata ne postoi",
    });
    }
    res.status(200).json(tura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTura = async (req, res) => {
  try {
    const tura = await Tura.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tura) {
      return res.status(404).json({ 
        status: "fail",
        message: "Turata ne postoi",
    });
    }
    res.status(200).json(tura);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTura = async (req, res) => {
  try {
    const tura = await Tura.findByIdAndDelete(req.params.id);
    if (!tura) {
      return res.status(404).json({ message: "Tura not found" });
    }
    res.status(200).json({ message: "Tura deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rezervirajTura = async (req, res) => {
  try {
    const rezervacija = await Rezervacija.create({
      user: req.user._id,
      tura: req.params.id,
    });

    res.status(201).json(rezervacija);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRezervacii = async (req, res) => {
  try {
    const rezervacii = await Rezervacija.find()
      .populate("user", "ime email")
      .populate("tura");

    res.status(200).json(rezervacii);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};