const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({path: `${__dirname}/../../config.env`});

const DB = process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD);

exports.init = async () =>{
    try{
        await mongoose.connect(DB);
        console.log("Succesfully connected to DB")
    }
    catch(err){
        console.log("error with DB " + err.message);
    }
}