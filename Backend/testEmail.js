require("dotenv").config();
const nodemailer = require("nodemailer");

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");

    await transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM, // নিজের email-এ test mail যাবে
      subject: "Brevo SMTP Test",
      text: "This is a test email from Node.js",
    });

    console.log("✅ Test Email Sent");
  } catch (err) {
    console.error("❌ SMTP Error:");
    console.error(err);
  }
}

testEmail();