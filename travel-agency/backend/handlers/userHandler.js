const sql = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("./emailHandler");

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      passportNumber,
      expiredDate,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passportNumber ||
      !expiredDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    //proverka na mail so regex
    const normalizedMail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedMail)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    //proverka na pass so regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    const findUserRequest = new sql.Request();
    findUserRequest.input("email", sql.VarChar, normalizedMail);
    const findUserQuery = `SELECT email FROM Users WHERE email = @email`;
    const userResult = await findUserRequest.query(findUserQuery);
    if (userResult.recordset.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const createUserRequest = new sql.Request();
    createUserRequest.input("firstName", sql.NVarChar(100), firstName.trim());

    createUserRequest.input("lastName", sql.NVarChar(100), lastName.trim());

    createUserRequest.input("email", sql.NVarChar(255), normalizedMail);

    createUserRequest.input("password", sql.NVarChar(255), hashedPassword);

    createUserRequest.input(
      "passportNumber",
      sql.NVarChar(10),
      passportNumber.trim(),
    );

    createUserRequest.input(
      "verificationToken",
      sql.NVarChar(255),
      verificationToken,
    );

    createUserRequest.input("expiredDate", sql.Date, expiredDate);

    const createUserQuery = `
      INSERT INTO Users
      (
        firstName,
        lastName,
        email,
        password,
        passportNumber,
        expiredDate,
        verificationToken,
        isVerified,
        createdAt
      )
      OUTPUT INSERTED.id
      VALUES
      (
        @firstName,
        @lastName,
        @email,
        @password,
        @passportNumber,
        @expiredDate,
        @verificationToken,
        0,
        GETDATE()
      )
    `;

    const creeatedUserResult = await createUserRequest.query(createUserQuery);
    const userId = creeatedUserResult.recordset[0].id;

    //token
    const token = jwt.sign(
      {
        id: userId,
        email: normalizedMail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    //cokie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //sendMail
    const verificationLink = `${process.env.SERVER_URL}/api/user-routes/verify-email/${verificationToken}`;

    await sendMail({
      to: normalizedMail,
      subject: "Verify your account",
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${verificationLink}">
          Verify Account
        </a>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      token,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.redirect(`${process.env.CLIENT_URL}/?verification=failed`);
    }

    const findUserByTokenRequest = new sql.Request();
    findUserByTokenRequest.input("token", sql.VarChar(255), token);

    const findUserByTokenQuery = `
       SELECT id, email, isVerified FROM Users
       WHERE verificationToken = @token
     `;

    const findUserByTokenResult =
      await findUserByTokenRequest.query(findUserByTokenQuery);
    if (findUserByTokenResult.recordset.length === 0) {
      return res.redirect(`${process.env.CLIENT_URL}/?verification=failed`);
    }

    const user = findUserByTokenResult.recordset[0];
    if (!user.isVerified) {
      const verifyUserRequest = new sql.Request();
      verifyUserRequest.input("token", sql.VarChar(255), token);
      const verifyUserQuery = `
        UPDATE Users
        SET isVerified = 1, verificationToken = NULL
        WHERE verificationToken = @token
      `;

      await verifyUserRequest.query(verifyUserQuery);
    }
    res.redirect(`${process.env.CLIENT_URL}/?verification=success`);
  } catch (err) {
    console.log(err);

    return res.redirect(`${process.env.CLIENT_URL}/?verification=failed`);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedMail = email.trim().toLowerCase();

    const findUserRequest = new sql.Request();
    findUserRequest.input("email", sql.VarChar(255), normalizedMail);

    const findUserQuery = `
      SELECT
        id,
        email,
        password,
        isVerified
      FROM Users
      WHERE email = @email
    `;
    const findUserResult = await findUserRequest.query(findUserQuery);

    if (findUserResult.recordset.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const existingUser = findUserResult.recordset[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!existingUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token: token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error," + err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const normalizedMail = email.trim().toLowerCase();

    const findUserRequest = new sql.Request();
    findUserRequest.input("email", sql.VarChar(255), normalizedMail);
    const findUserQuery = `SELECT id, email FROM Users WHERE email = @email`;
    const userResult = await findUserRequest.query(findUserQuery);
    if (userResult.recordset.length === 0) {
      return res
        .status(400)
        .json({ message: "User doesn't exist, please register" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetTokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const existingUser = userResult.recordset[0];

    const updateResetTokenRequest = new sql.Request();
    updateResetTokenRequest.input(
      "hashedResetToken",
      sql.VarChar(255),
      hashedResetToken,
    );
    updateResetTokenRequest.input(
      "resetTokenExpiresAt",
      sql.DateTime,
      resetTokenExpiresAt,
    );
    updateResetTokenRequest.input("email", sql.VarChar(255), normalizedMail);

    const updateResetTokenQuery = `
      UPDATE Users
      SET verificationToken = @hashedResetToken,
          passwordResetExpires = @resetTokenExpiresAt
      WHERE email = @email
    `;

    await updateResetTokenRequest.query(updateResetTokenQuery);
    const resetUrl = `${req.protocol}://${req.get(
      "host",
    )}/reset-password/${resetToken}`;

    console.log("normalizedMail", normalizedMail);
    await sendMail({
      to: normalizedMail,
      subject: "Reset password",
      html: `
        Reset password message.<br/>
        Please follow the link:<br/>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
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
    const deleteUserPayload = req.body;

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
