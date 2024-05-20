import nodemailer from "nodemailer";

const emailOTPsender = async (email, otp) => {
  try {
    let transporter = nodemailer.createTransport({
      // Configure nodemailer transporter
      // Example configuration using Gmail:
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    let info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL}>`,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default emailOTPsender;
