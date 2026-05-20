const nodemailer = require('nodemailer');

const sendMail = async (credentials) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
      from: '"Turisticka Agencija" <turistickaagencija@semos.com.mk>',
      to: credentials.email,
      subject: credentials.subject,
      text: credentials.message,
    };

    // dali e pratena
    try{
        const info = transporter.sendMail(mailOptions);
        console.log("Emai sent successfully")
    }
    catch(err){
        console.error("Sending fail: ", err);
    }
}