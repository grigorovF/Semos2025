const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD);


exports.init = async () => {
    try{
        await mongoose.connect(DB);
        console.log("Database is successfully connected");
    }
    catch(err){
        console.log(err.message + "Problem with DB");
    }
}