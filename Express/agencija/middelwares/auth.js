const jwt = require("jsonwebtoken");
const User = require("../pkg/userSchema/userSchema");

exports.protect = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ message: "You dont have permission" });

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
