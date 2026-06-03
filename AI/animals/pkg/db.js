const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD,
);
exports.init = async () => {
  try {
    await mongoose.connect(DB);

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};
