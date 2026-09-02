const nodemailer = require("nodemailer");

// ============================================================
// OUTLOOK / MICROSOFT 365 SMTP CONFIGURATION
// ============================================================

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,

  // Port 587 uses STARTTLS
  secure: false,
  requireTLS: true,

  // Force IPv4
  family: 4,

  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASSWORD,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// ============================================================
// CHECK SMTP CONNECTION
// ============================================================

transporter.verify((error, success) => {
  if (error) {
    console.error(
      "❌ Outlook SMTP Verify Error:",
      error.message
    );
  } else {
    console.log(
      "✅ Outlook SMTP Server Ready"
    );
  }
});

// ============================================================
// SEND EMAIL
// ============================================================

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log(
      `📨 Sending email to: ${to}`
    );

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