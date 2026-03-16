const jwt = require("jsonwebtoken");
const User = require("../pkg/userSchema/userSchema");
const crypto = require("")

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


exports.forgotPassword = async (req, res) =>{
  try{
    const user = await User.findOne({email: req.body.mail});

    if(!user){
      return res.status(404).send("This user doesnt exist");
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    const resetURL = `http://localhost:3000/resetPassword/${resetToken}`;

    res.status(200).json({
      message: "Reset link generated",
      resetURL,
    });

  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token invalid or expired",
      });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password successfully reset",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};