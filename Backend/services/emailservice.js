const dns = require("dns");

// Prefer IPv4 instead of IPv6
dns.setDefaultResultOrder("ipv4first");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASSWORD,
  },

  pool: true,
  maxConnections: 1,
  maxMessages: 100,

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,

  tls: {
    minVersion: "TLSv1.2",
    servername: "smtp.office365.com",
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Outlook SMTP Verify Error:", error.message);
  } else {
    console.log("✅ Outlook SMTP Server Ready");
  }
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log(`📨 Sending email to: ${to}`);

    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.OUTLOOK_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent Successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Outlook Send Mail Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;