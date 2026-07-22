const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

const sendEmail = async (to, subject, message) => {
  await transporter.sendMail({
    from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html: `
      <h2>${subject}</h2>
      <p>${message}</p>
    `,
  });

  console.log("Email sent");
};

module.exports = sendEmail;