const sendEmail = require('../utils/emailService');

// @desc    Send contact email
// @route   POST /api/contact
// @access  Public
exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  try {
    const emailOptions = {
      email: process.env.CONTACT_DESTINATION_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      message: `You have a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #38bdf8;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">Sent from WarrantyVault Landing Page</p>
        </div>
      `,
    };

    await sendEmail(emailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ success: false, message: 'Email could not be sent' });
  }
};
