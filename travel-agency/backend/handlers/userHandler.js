const sql = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("./emailHandler");

exports.register = async (req, res) => {
  try {
    const registerPayload = req.body;

    const { firstName, lastName, email, password, passportNumber, expDay } =
      registerPayload;

    const findUserQuery = `
      SELECT * FROM Users
      WHERE email = '${email}'
    `;

    const findUserResult = await sql.query(findUserQuery);

    if (findUserResult.recordset.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserQuery = `
      INSERT INTO Users(
        firstName,
        lastName,
        email,
        password,
        passportNumber,
        expDay
      )
      VALUES(
        '${firstName}',
        '${lastName}',
        '${email}',
        '${hashedPassword}',
        '${passportNumber}',
        '${expDay}'
      )
    `;

    await sql.query(createUserQuery);

    const getCreatedUserQuery = `
      SELECT * FROM Users
      WHERE email = '${email}'
    `;

    const getCreatedUserResult = await sql.query(getCreatedUserQuery);

    const createdUser = getCreatedUserResult.recordset[0];

    const jwtToken = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      token: jwtToken,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const loginPayload = req.body;

    const { email, password } = loginPayload;

    const findUserQuery = `
      SELECT * FROM Users
      WHERE email = '${email}'
    `;

    const findUserResult = await sql.query(findUserQuery);

    if (findUserResult.recordset.length === 0) {
      return res.status(400).json({
        message: "User doesn't exist, please register",
      });
    }

    const existingUser = findUserResult.recordset[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Email or password are incorrect",
      });
    }

    const jwtToken = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Successfully logged in",
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const forgotPasswordPayload = req.body;

    const { email } = forgotPasswordPayload;

    const findUserQuery = `
      SELECT * FROM Users
      WHERE email = '${email}'
    `;

    const findUserResult = await sql.query(findUserQuery);

    if (findUserResult.recordset.length === 0) {
      return res.status(400).json({
        message: "User doesn't exist, please register",
      });
    }

    const existingUser = findUserResult.recordset[0];

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetTokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const updateResetTokenQuery = `
      UPDATE Users
      SET
        passwordResetToken = '${hashedResetToken}',
        passwordResetExpires = '${resetTokenExpiresAt}'
      WHERE id = '${existingUser.id}'
    `;

    await sql.query(updateResetTokenQuery);

    const resetUrl = `${req.protocol}://${req.get(
      "host",
    )}/resetPassword/${resetToken}`;

    const resetPasswordMessage = `
      Reset password message.
      Please follow the link:
      ${resetUrl}
    `;

    await sendMail({
      email: existingUser.email,
      subject: "Reset password",
      message: resetPasswordMessage,
    });

    res.status(200).json({
      message: "Token sent to email",
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.passwordReset = async (req, res) => {
  try {
    const resetPasswordPayload = req.body;

    const resetToken = req.params.token;

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const findUserByResetTokenQuery = `
      SELECT * FROM Users
      WHERE passwordResetToken = '${hashedResetToken}'
      AND passwordResetExpires > GETDATE()
    `;

    const findUserByResetTokenResult = await sql.query(
      findUserByResetTokenQuery,
    );

    if (findUserByResetTokenResult.recordset.length === 0) {
      return res.status(400).json({
        message: "Token is invalid or expired",
      });
    }

    const existingUser = findUserByResetTokenResult.recordset[0];

    const hashedPassword = await bcrypt.hash(resetPasswordPayload.password, 10);

    const updatePasswordQuery = `
      UPDATE Users
      SET
        password = '${hashedPassword}',
        passwordResetToken = NULL,
        passwordResetExpires = NULL
      WHERE id = '${existingUser.id}'
    `;

    await sql.query(updatePasswordQuery);

    res.status(200).json({
      message: "Password successfully reset",
    });
  } catch (err) {
    res.status(500).json(err.message + " Error resetting password");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteUserPayload = req.body.params;

    const { id } = deleteUserPayload;

    const deleteUserRequest = new sql.Request();

    deleteUserRequest.input("id", sql.Int, id);

    const deleteUserQuery = `
      DELETE FROM Users
      OUTPUT DELETED.*
      WHERE id = @id
    `;

    const deleteUserResult = await deleteUserRequest.query(deleteUserQuery);

    if (deleteUserResult.recordset.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User successfully deleted",
      deletedUser: deleteUserResult.recordset[0],
    });
  } catch (err) {
    res.status(500).json(err.message + " Error deleting user");
  }
};


