import nodemailer from 'nodemailer';

const verifymail = async (email, link, userName) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Leapkore Support" <${process.env.EMAIL}>`, // Sender address
      to: email, // List of recipients
      subject: 'Verify Your Leapkore Account', // Subject line
      text: `Dear ${userName},\n\nThank you for registering with Leapkore. To complete your registration and activate your account, please verify your email address by clicking the link below:\n\n${link}\n\nIf you did not create an account with us, please ignore this email.\n\nBest regards,\nLeapkore Team`, // Plain text body
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #333;">Welcome to Leapkore!</h2>
            <p>Dear ${userName},</p>
            <p>Thank you for registering with Leapkore. To complete your registration and activate your account, please verify your email address by clicking the link below:</p>
            <p><a href="${link}" style="color: #1a73e8; text-decoration: none;">Verify and Activate Your Account</a></p>
            <p>If you did not create an account with us, please ignore this email.</p>
            <p>Best regards,</p>
            <p><strong>Leapkore Team</strong></p>
            <hr style="border: none; border-top: 1px solid #ccc;"/>
            <p style="font-size: 0.9em; color: #777;">This email was sent from an unmonitored mailbox. Please do not reply directly to this email.</p>
          </div>
        </div>
      `,
    });

  } catch (error) {
    console.error('Error sending mail:', error);
  }
};

export default verifymail;
