const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendMail = async(to, subject, html)=>{

    try{

        const info = await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: to,

            subject: subject,

            html: html

        });


        console.log("Email sent:", info.messageId);

    }
    catch(err){

        console.log("Mail error:", err);

        throw err;

    }

}


module.exports = sendMail;