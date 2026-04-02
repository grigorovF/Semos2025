//handlers>userHandler

const jwt = require("jsonwebtoken");
const User = require("../pkg/schemas/korisnikSchema");
const StudyProgram = require("../pkg/schemas/studyProgramSchema");
const Counter = require("../pkg/schemas/counterSchema");
const getNextSequence = require("./counterHelper");
const sendMail = require("./emailHandler");
const bcyipt = require("bcryptjs");
const User = require("../pkg/schemas/korisnikSchema");
const StudyProgram = require("../pkg/schemas/studyProgram");
const getNextSequence = require("./helpers/counterHelper");
const sendMail = require("./emailHandler");

exports.userRegister = async (req, res) => {
  try {
    const { firstName, lastName, mail, studyProgram, year, password, role } =
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

      await sendMail({
        to: newUser.email,
        subject: "Академски профил",
        text: `Добредојдовте на Cemos Академијата. \n
        Вашиот индекс е: ${generatedIndex}\nВашиот академски email е: ${akademskiEmail}`,
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

      await sendMail({
        to: newUser.email,
        subject: "Профил креиран",
        text: `Вашиот академски email е: ${akademskiEmail}`,
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