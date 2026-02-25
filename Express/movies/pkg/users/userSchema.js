const mongoose = require('mongoose');
const bycript = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Imeto e zazdolzitelno!"],
    },

    email:{
        type: String,
        required: [true, "Vnesete e-mail"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Vnesete pravilen e-mail"],
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    password: {
        type: String,
        required: [true, "Mora da ima password"],
        validate: [validator.isStrongPassword],
        minLength: [4, "Mora da ima minimum 4 karakteri"],
    },
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password"))
        return;

    this.password = await bycript.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
module.exports = User;