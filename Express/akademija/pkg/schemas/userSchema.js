//pkg>schemas>userSchema.js

// validator, bcryptjs

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const korisnikSchema = new mongoose.Schema(
  {
    ime: {
      type: String,
      required: [true, "Poleto za ime e zadolzitelno"],
    },

    prezime: {
      type: String,
      required: [true, "Poleto za prezime e zadolzitelno"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Ve molam vnesete validen email"],
    },
    studyProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyProgram",
      required: function () {
        return this.role === "student";
      },
    },

    indeks: {
      type: String,
      unique: true,
    },

    role: {
      type: String,
      enum: ["student", "professor"],
      default: "student",
    },

    year: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: function () {
        return this.role === "student";
      },
    },

    akademskiEmail: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Mora da ima password"],
      minLength: [6, "Mora da ima najmalce 6 karakteri"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: String,
    verificationExpires: Date,

    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

korisnikSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Korisnik = mongoose.model("Korisnik", korisnikSchema);
module.exports = Korisnik;
