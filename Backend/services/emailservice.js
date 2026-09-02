const dns = require("dns").promises;
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  let transporter;

  try {
    // Always resolve Office365 to IPv4
    const smtpHost = await dns.lookup("smtp.office365.com", {
      family: 4,
    });

    console.log("🌐 Office365 IPv4:", smtpHost.address);

    // Create a fresh SMTP connection for this email
    transporter = nodemailer.createTransport({
      host: smtpHost.address,
      port: 587,
      secure: false,
      requireTLS: true,

      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASSWORD,
      },

      tls: {
        servername: "smtp.office365.com",
        minVersion: "TLSv1.2",
      },

      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    console.log(`📨 Sending email to: ${to}`);

    // Verify this fresh connection
    await transporter.verify();

    console.log("✅ Outlook SMTP Server Ready");

    // Send email
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

  } finally {
    // Close this SMTP connection after sending
    if (transporter) {
      transporter.close();
      console.log("🔌 SMTP Connection Closed");
    }
  }
};

module.exports = sendEmail;