const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // For production, you would use a real SMTP service like Gmail, SendGrid, etc.
  // For development, you can use a test account or environment variables.
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'WarrantyVault'} <${process.env.FROM_EMAIL || 'no-reply@warrantyvault.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
