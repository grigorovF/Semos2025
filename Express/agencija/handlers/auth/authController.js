const crypto = require("crypto");
const User = require("../../pkg/users/userSchema");

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
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};