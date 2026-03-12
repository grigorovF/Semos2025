const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.verify((err,succ) => {
        if(err)
            console.log(err.message);
        else
            console.log("success sending mail");
    });

    const mailOptions = {
        from: "turistickaagencija@semos.com.mk",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

// const sendPasswordChange = async (options) => {};
// const sendWelcomeMessage = async (options) => {};