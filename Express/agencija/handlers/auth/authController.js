const crypto = require("crypto");
const User = require("../../pkg/userSchema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../email/emailHandler");
//import email

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

    await sendEmail({
      email: user.email,
      subject: "Vi blagodarime za poddrskata",
      message: "Vi blagodarime za registracijata",
    });

    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } catch (err) {
    res.status(500).json("KAJ" + err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or password are incorrect!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Email or password are incorrect!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    // 1. Go pronaogjame korisnikot so pomosh na neogiviot submitiran email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("This user doesnt exist");
    }
    // 2. generirame resetiracki token
    const token = crypto.randomBytes(32).toString("hex");

    // 3. generiraniot resetiracki token go hashirame i go vmetnuvame vo data baza kaj korisnikot
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 4. Generirame vreme na resetirackiot token

    user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    // 5. novo komponiranite filda gi zacuvuvame vo data baza
    await user.save({ validateBeforeSave: false });

    // 6. Kreirame resetiracki link
    const resetUrl = `${req.protocol}://${req.get("host")}/resetPassword/${token}`;
    const message = `Ja zaboravivte lozinkata. ve molime iskosistete Patch request so vashata nova lozinka i ova e rest url: ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset token (30 min valid)",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    return res.status(500).send("Tuka e:" + err.message);
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
