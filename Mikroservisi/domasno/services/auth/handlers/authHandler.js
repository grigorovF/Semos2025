const User = require("../../../pkg/users/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);

    user.password = undefined;

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      },
    );

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
