const jwt = require("jsonwebtoken");
const User = require("../pkg/users/userSchema");
const bcrypt = require("bcryptjs");
const {promisify} = require("util");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      },
    );

    res.cookie("jwt", token, {
      exppires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    // const email = req.body.email;
    // const password = req.body.password;

    const { email, password } = req.body;

    //1.Dali ima   vneseno
    if (!email || !password) {
      return res.status(400).send("vnesi email ili password");
    }

    //Dali postoi userot
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    //3. Sporedi password
    const isPasswordValid = bycript.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    //4. Generiraj token
    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      },
    );

    res.cookie("jwt", token, {
      exppires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.protect = async (req, res, next) => {
  try{
    let token;
    if(req.headers.authorization){
      token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
      res.status(401).send("You are not login");
    }

    //verifikacija na token

    //prv nacin
    function verifyToken(token){
      return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>{
          
        })
      })
    }
    next();
  }
  catch(err){
    return res.status(500).send(err.message)
  }
}