const mongoose = require('mongoose');
//* npm install validator - biblioteka za validacija
const validator = require('validator');
//* npm install bcrypt - biblioteka za kriptiranje
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true, // site bukvi da se mali
    unique: true, // sekoj email da e unikaten
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Password must be at least 4 characters'],
    // validate: [validator.isStrongPassword, 'Please provide a strong password'],
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  //! AKO NE E PROMENET PASSWORDOT
  if (!this.isModified('password')) {
    //! SLEDNO - ovde zapira funkcijata i ne se izvrsuva toa sto e nadolu
    return next();
    //? AKO E PROMENET PASSWORDOT ILI IMAME PASSWORD NEKAOV
  } else {
    //? togash se korisi elsot ili se hashira paswrodot so jacina 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
