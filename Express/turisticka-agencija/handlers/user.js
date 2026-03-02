const User = require("../pkg/user/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { ime, email, password } = req.body;

    const postoi = await User.findOne({ email });
    if (postoi) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      ime,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      id: user._id,
      ime: user.ime,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    
    res.status(200).json({
      id: user._id,
      ime: user.ime,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};