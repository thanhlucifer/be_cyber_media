import nodemailer from "nodemailer";
import { MAIL_USER, MAIL_APP_PASS } from "../constants/app.constants.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: MAIL_USER,
        pass: MAIL_APP_PASS,
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(email, full_name) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Lucifer Team 👻" <lucifer@gmail.com>', // sender address
        to: email, // recipient's email
        subject: "Welcome to Our Community! 🎉", // Subject line
        text: `Hi ${full_name},\n\nThank you for joining our community. We're thrilled to have you on board!\n\nIf you have any questions, feel free to reach out to our support team.\n\nBest regards,\nYour Website Team`, // plain text body
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #F72F5B;">Welcome, ${full_name}  🎉</h2>
        <p>Thank you for joining our community. We're thrilled to have you on board!</p>
        <p>If you have any questions, feel free to reach out to our support team at any time.</p>
        <p style="margin-top: 20px;">Best regards,<br><strong>Lucifer Team</strong></p>
      </div>
    `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


