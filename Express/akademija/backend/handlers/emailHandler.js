//handlers > emailHandlers.js
const nodemailer = require('nodemailer');

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    transporter.verify((err, succ) => {
        if (err){
            console.log("Cannot send mail!" + err.message)
        }
        else{
            console.log("Email is successfuly sent");
        }
    });

    const mailOption = {
        from: "studentska_sluzba@semos.com.mk",
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOption);
};


module.exports = sendMail;