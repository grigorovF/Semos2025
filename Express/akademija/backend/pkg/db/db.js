//pkg > db > db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/../../config.env`});

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);

exports.init = async () => {
    try{
        await mongoose.connect(DB);
        console.log("Uspesna koncekcija so databaza")
    }
    catch(err){
        console.log("Problem so konekcijata so databaza, " + err.message);
    }
}