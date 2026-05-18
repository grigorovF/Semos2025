const User = require('../../../pkg/user/userSchema');
//* npm install jsonwebtoken
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Proveruvame dali ima vneseno email i password
    if (!email || !password) {
      return res.status(400).send('Please provide email and password');
    }
    // 2) Proveruvame dali korisinkot postoi vo nashata data baza
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('invalid email or password!');
    }

    // 3) sporeduvanje na passwordi
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send('invalid email or password');
    }

    // 4) Generirame i isprakjame token
    const token = jwt.sign(
      { id: user._id, name: user.name, test: 'TEST' },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    // 5) pustame response
    res.status(201).json({ status: 'success', token });
  } catch (err) {
    res.stats(500).send(err);
  }
};
