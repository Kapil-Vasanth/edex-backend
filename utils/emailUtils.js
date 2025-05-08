const nodemailer = require('nodemailer');

// Create a transporter for sending emails using custom SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,     // SMTP server of your domain
  port: 465,                         // Use 465 for SSL or 587 for TLS
  secure: true,                      // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,    // your custom email
    pass: process.env.EMAIL_PASS,   // password (preferably from env)
  },
});

// Function to send a password reset email
async function sendPasswordResetEmail(email, token, firstName) {
    console.log('Sending password reset email to:', email);
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Edex Academy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Password Reset Request',
    text: `You requested a password reset. Please use the following link to reset your password:\n\n${resetLink}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2c3e50;">Password Reset Request</h2>
        <p>Hello, ${firstName}</p>
        <p>You recently requested to reset your password for your Edex Academy account. Click the button below to reset it:</p>
        <p style="text-align: center;">
          <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <p>Thanks,<br/>The Edex Academy Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
}

module.exports = { sendPasswordResetEmail };
