//handlers>userHandler

const jwt = require('jsonwebtoken');
const User = require ('../pkg/schemas/korisnikSchema');
const sendMail = require('./emailHandler');
const bcyipt = require('bcryptjs');

exports.userRegister = async(req, res) => {
    
}