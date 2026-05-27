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
      to: credentials.to,
      subject: credentials.subject,
      html: credentials.html,
    };

    // dali e pratena
    try{
        const info = await transporter.sendMail(mailOptions);
        console.log("Emai sent successfully")
    }
    catch(err){
        console.error("Sending fail: ", err);
    }
}

module.exports = sendMail;