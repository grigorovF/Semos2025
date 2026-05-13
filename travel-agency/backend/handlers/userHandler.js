const sql = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require('./emailHandler');

exports.register = async (req, res) => {
  try {
    const { firstName,
            lastName,
           email, 
           password, 
           passportNumber, 
           expDay 
          } =
      req.body;

    const existingUser = await sql.query(
      `SELECT * FROM Users WHERE email = '${email}'`
    );

    if (existingUser.recordset.length > 0)
      return res.status(400).json({
        message: "User alredy exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql.query(`
            INSERT INTO Users(firstName, lastName, email, password, passportNumber, expDay)
            VALUES(
              '${firstName}',
              '${lastName}',
              '${email}',
              '${hashedPassword}',
              '${passportNumber}',
              '${expDay}'
            )
          `);

    const selectedUser = await sql.query(
      `SELECT * FROM Users WHERE email='${email}'`,
    );

    const user = selectedUser.recordset[0];

    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET, 
      {expiresIn: "7d"}
    );

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async(req, res) =>{
  try{
    const {email, password} = req.body;
    const existingUser = await sql.query(
      `SELECT * FROM Users WHERE email= '${email}'`,
    );

    if (existingUser.recordset.length === 0){
      return res.status(400).json({
        message: "User doesn't exist, please register",
      })
    }

    const user = existingUser.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      return res.status(400).json({
        message: "Email or password are incorrect",
      })
    }

    const token = jwt.sign(
      {id: user.id},
      process.env.JWT_SECRET,
      {expiresIn: "7d"},
    )

    res.cookie("jwt", token, {
      httpOnly: true, 
      maxAge: 7*24*60*60*1000
    });

    res.status(200).json({
      message: "successfuly logged in"
    })


  } catch(err){
    res.status(500).json(err.message);
  }
} 

exports.forgotPassword = async(req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await sql.query(
      `SELECT * FROM Users WHERE email = '${email}'`,
    );

    if (existingUser.recordset.length === 0) {
      return res.status(400).json({
        message: "User doesn't exist, please register",
      });
    }

    const token = crypto.randomBytes(32).toString('hex');

    const user = existingUser.recordset[0];
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest('hex');

    const expires = new Date(Date.now() + 30 * 60 * 1000);
    

    //update na baza
    await sql.query(
      `UPDATE Users SET 
        passwordResetToken = '${hashedToken}',
        passwordResetExpires = '${expires}'
      `
    )

    const resetUrl = `${req.protocol}://${req.get("host")}/resetPassword/${token}`;

    const message = `Reset password message. Please folow the link. Reset link: ${resetUrl}`
    
    await sendMail({
      email: user.email,
      subject: "Reset password",
      message
    });

    res.status(200).json({
      message: "Token sent to email"
    })
  } catch (err) {
    res.status(500).json(err.message);
  }
}

exports.passwordReset = async(req, res) => {
  try {
    const token = req.params.token;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const existingUser = await sql.query(
      `SELECT * FROM Users WHERE passwordResetToken = '${hashedToken}'
      AND passwordResetExpires>GETDATE()`
    );

    if (existingUser.recordset.length === 0){
      return res.status(400).json({
        message: "Token is invalid or expired",
      });
    }

    const user = existingUser.recordset[0];

    const hashedPassword =  await bcrypt.hash(req.body.password, 10);

    await sql.query(`
      UPDATE Users
      SET
        password='${hashedPassword}',
        passwordResetToken=NULL,
        passwordResetExpires=NULL
      WHERE id='${user.id}'
    `);

    res.status(200).json({
      message: "Password successfully reset",
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
}