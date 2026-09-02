require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASSWORD,
  },
});

async function testEmail() {
  try {
    await transporter.verify();

    console.log("✅ Outlook SMTP Connected Successfully");

    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.OUTLOOK_EMAIL}>`,

     // my gmail option
      to: "arghyadey043@gmail.com",

      subject: "Utkal Hospital - Gmail Test",

      html: `
        <h2>Test Email Successful</h2>
        <p>
          This is a test email from the Utkal Hospital
          Patient Feedback System.
        </p>
      `,
    });

    console.log("✅ Test Email Sent Successfully");
    console.log("Message ID:", info.messageId);

  } catch (error) {
    console.error("❌ Outlook SMTP Error:");
    console.error(error);
  }
}

testEmail();