const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/../../config.env`});

const DB = process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD);

exports.init = async() => {
    try{
        await mongoose.connect(DB);
        console.log("Successfuly connected to database");
    }
    catch(err){
        console.log("Problem with database " + err.message);
    }
}