const jwt = require("jsonwebtoken");
const User = require("../pkg/userSchema/userSchema");
const crypto = require("crypto");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ message: "You dont have permission" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User doesn't exist" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission for this action" });
    }
    next();
  };
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const resetURL = `http://localhost:3000/resetPassword/${resetToken}`;

    console.log("RESET LINK:");
    console.log(resetURL);

    res.status(200).json({
      message: "Token sent",
      resetURL,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
