const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASSWORD,
  },

  tls: {
    ciphers: "SSLv3",
  },
});

// Check Outlook SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Outlook SMTP Verify Error:", error.message);
  } else {
    console.log("✅ Outlook SMTP Server Ready");
  }
});


const sendEmail = async ({
  to,
  subject,
  html,
}) => {

  try {

    const info = await transporter.sendMail({

      from: `"${process.env.EMAIL_NAME}" <${process.env.OUTLOOK_EMAIL}>`,

      to,

      subject,

      html,

    });

    console.log(
      "✅ Email Sent Successfully:",
      info.messageId
    );

    return info;

  } catch (error) {

    console.error(
      "❌ Outlook Send Mail Error:",
      error.message
    );

    throw error;
  }
};


module.exports = sendEmail;