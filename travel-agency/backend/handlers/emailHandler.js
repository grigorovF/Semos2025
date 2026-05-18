const nodemailer = require("nodemailer");

const sendMail = async(credentials) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    transporter.verify((err, succ) => {
        if (err)
            console.log('Sending mail failed');
        else
            console.log('Email is successfuly sent');            
    })

    const mailOptions = {
        from: 'turistickaagencija@semos.com.mk',
        to: credentials.email,
        subject: credentials.subject,
        text: credentials.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;