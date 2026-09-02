const dns = require("dns").promises;
const nodemailer = require("nodemailer");

let transporter = null;

// Create SMTP transporter using IPv4
const createTransporter = async () => {
  try {
    // Resolve smtp.office365.com to IPv4
    const result = await dns.lookup("smtp.office365.com", {
      family: 4,
    });

    console.log("🌐 Office365 IPv4:", result.address);

    transporter = nodemailer.createTransport({
      host: result.address,
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

      pool: true,
      maxConnections: 1,
      maxMessages: 100,

      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    await transporter.verify();

    console.log("✅ Outlook SMTP Server Ready");

  } catch (error) {
    console.error("❌ Outlook SMTP Setup Error:", error.message);
    transporter = null;
  }
};


// Send Email
const sendEmail = async ({ to, subject, html }) => {
  try {

    // Create transporter if not available
    if (!transporter) {
      await createTransporter();
    }

    // If still unavailable, stop
    if (!transporter) {
      throw new Error("SMTP transporter is not available");
    }

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