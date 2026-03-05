const User = require("../../pkg/userSchema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
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
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email or password are incorrect!",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Email or password are incorrect!",
      });
    }

    const token = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: "7d"},
    );

    res.status(201).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};
