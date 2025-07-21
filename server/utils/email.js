import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmailNotification = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"Welcome to Instagram" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error };
  }
};
