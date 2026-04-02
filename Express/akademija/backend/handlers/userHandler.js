//handlers>userHandler

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../pkg/schemas/korisnikSchema");
const StudyProgram = require("../pkg/schemas/studyProgramSchema");
const Counter = require("../pkg/schemas/counterSchema");
const getNextSequence = require("./counterHelper");
const sendMail = require("./emailHandler");
const bcyipt = require("bcryptjs");
const StudyProgram = require("../pkg/schemas/studyProgram");


exports.userRegister = async (req, res) => {
  try {
    const { firstName, lastName, mail, studyProgram, year, password} =
      req.body;

    let newUser;

    if (role === "student") {
      const program = await StudyProgram.findById(studyProgram);

      if (!program) {
        return res.status(404).json({
          status: "fail",
          message: "Program not found",
        });
      }

      const seq = await getNextSequence(program._id, year);
      const serial = String(seq).padStart(3, "0");

      const generatedIndex = `${year}${program.code}${serial}`;
      const akademskiEmail = `${generatedIndex}@students.semos.mk`;

      newUser = await User.create({
        ime: firstName,
        prezime: lastName,
        email: mail,
        studyProgram: program._id,
        year: year,
        indeks: generatedIndex,
        akademskiEmail: akademskiEmail,
        password: password,
        role: "student",
      });

      const rawToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest("hex");

      newUser.verificationToken = hashedToken;
      newUser.verificationExpires = Date.now() + 30*60*1000;

      await newUser.save({validateBeforeSave: false});

      const verificationURL = `http://localhost:3000/verify/${rawToken}`;

      await sendMail({
        to: newUser.email,
        subject: "Линк за активација",
        text: `Добредојдовте на Cemos Академијата. \n
        Вашиот индекс е: ${generatedIndex}\nВашиот академски email е: ${akademskiEmail}\n
        Кликнете на следниот линк за активација: ${verificationURL}`,
      });
    } else {
      let baseEmail = `${firstName}.${lastName}`.toLowerCase();
      let akademskiEmail = `${baseEmail}@semos.mk`;

      let counter = 1;

      while (await User.findOne({ akademskiEmail })) {
        akademskiEmail = `${baseEmail}${counter}@semos.mk`;
        counter++;
      }

      newUser = await User.create({
        ime: firstName,
        prezime: lastName,
        email: mail,
        password: password,
        role: "professor",
        akademskiEmail: akademskiEmail,
      });
      const rawToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

      newUser.verificationToken = hashedToken;
      newUser.verificationExpires = Date.now() + 30 * 60 * 1000;

      await newUser.save({ validateBeforeSave: false });

      const verificationURL = `http://localhost:3000/verify/${rawToken}`;

      await sendMail({
        to: newUser.email,
        subject: "Линк за активација",
        text: `Добредојдовте на Cemos Академијата. \n
       
        Кликнете на следниот линк за активација: ${verificationURL}`,
      });

    }

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const crypto = require("crypto");

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Token invalid or expired",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Account verified",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email i password se zadolzitelni",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await require("bcryptjs").compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }


    if (!user.isVerified) {
      return res.status(401).json({
        message: "Verify your email first",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES },
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email е задолжителен" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 минути
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:3000/reset-password/${rawToken}`;

  await sendMail({
    email: user.email,
    subject: "Reset your password",
    message: `Кликнете на линк за ресет на лозинка:\n${resetURL}`,
  });

  res.status(200).json({ message: "Email испратен со инструкции" });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Token invalid or expired" });

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({ message: "Password has been reset" });
};