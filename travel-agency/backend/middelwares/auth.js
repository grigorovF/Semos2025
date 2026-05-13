const jwt = require("jsonwebtoken");
const sql = require("../db");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const selectedUser = await sql.query(
      `SELECT * FROM Users WHERE id = '${decodedToken.id}'`,
    );

    if (selectedUser.recordset.length === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = selectedUser.recordset[0];
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied: Admin only",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};