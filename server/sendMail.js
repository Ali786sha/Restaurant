// backend/utils/sendMail.js

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Food Delivery" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email failed:", error);
  }
};

module.exports = sendMail;
