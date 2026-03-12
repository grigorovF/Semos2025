const express = require('express');
const router = express.Router();
const sendMail = require('../../handlers/email/emailHandler');

router.post('/send-mail', async(req,res) => {
    try{
        await sendMail({
          email: req.body.email,
          subject: "Reset Password",
          message: "Tuka treba da ima link za promena",
        });
        res.json({ message: "Email sent successfully" });
    }
    catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;