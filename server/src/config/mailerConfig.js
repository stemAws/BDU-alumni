const nodemailer = require("nodemailer");
require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 465 if you set `secure: true`
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.G_MAIL_USER,
    pass: process.env.G_MAIL_PASSWORD, // Use App Password here
  },
});

module.exports = transporter;
