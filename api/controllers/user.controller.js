import User from "../models/user.model.js";
import EMAILOTP from "../models/mailOTP.model.js"
import emailOTPsender from "../utils/emailOTPmailsender.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "Test API is working fine!" });
};

export const updateProfile = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You cannot make changes to this user"));
  }

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { profilepicture: req.body.profilepicture } },
      { new: true }
    );

    const { password, ...rest } = updatedProfile._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You cannot make changes to this user"));
  }

  if (
    !req.body.currentPassword ||
    !req.body.newPassword ||
    !req.body.confirmPassword ||
    req.body.currentPassword === "" ||
    req.body.newPassword === "" ||
    req.body.confirmPassword === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      errorHandler(400, "New password and confirm password are not matching")
    );
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isMatch = bcryptjs.compareSync(
      req.body.currentPassword,
      user.password
    );
    if (!isMatch) {
      return next(errorHandler(401, "Current password is Incorrect"));
    }

    const hashedPassword = bcryptjs.hashSync(req.body.newPassword, 10);
    const updatedPassword = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    const { password, ...rest } = updatedPassword._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You cannot make changes to this user"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("Account has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("You have been Logged Out");
  } catch (error) {
    next(error);
  }
};

export const sendOTPforEmail = async (req, res, next) => {
  try {
    // Check if the email value is provided
    if (!req.body.changeEmail) {
      return res.status(400).json({ error: "Enter the new Email Id." });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: req.body.changeEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if there is an existing OTP for the requested email and delete it
    await EMAILOTP.findOneAndDelete({ email: req.body.changeEmail });

    // Save the new OTP to the database
    const newOTP = new EMAILOTP({
      userId: req.params.userId,
      email: req.body.changeEmail,
      otp,
      createdAt: new Date(),
    });
    await newOTP.save();

    // Send the OTP via email
    const user = await User.findById(req.params.userId);
    await emailOTPsender(req.body.changeEmail, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};



export const verifyOTPforEmail = async (req, res, next) => {
  try {
    const { emailOTP } = req.body;

    // Check if emailOTP is provided
    if (!emailOTP) {
      return res.status(400).json({ error: "emailOTP is required" });
    }

    // Find the OTP record in the database using the user ID
    const otpRecord = await EMAILOTP.findOne({ userId: req.params.userId, otp: emailOTP });

    // Check if the OTP record exists and is not expired (assuming 10 minutes expiry time)
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // If valid, update the user's email in the database
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.email = otpRecord.email;
    await user.save();

    // Optionally, you can delete the OTP record after successful verification
    await EMAILOTP.deleteOne({ userId: req.params.userId, otp: emailOTP });

    res.status(200).json({ message: "Email verified and updated successfully" });
  } catch (error) {
    next(error);
  }
};


export const resendOTPforEmail = async (req, res, next) => {
  try {
    // Check if the email value is provided
    if (!req.body.changeEmail) {
      return res.status(400).json({ error: "Invalid Request" });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: req.body.changeEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Invalid Request. Please try later" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if there is an existing OTP for the requested email and delete it
    await EMAILOTP.findOneAndDelete({ email: req.body.changeEmail });

    // Save the new OTP to the database
    const newOTP = new EMAILOTP({
      userId: req.params.userId,
      email: req.body.changeEmail,
      otp,
      createdAt: new Date(),
    });
    await newOTP.save();

    // Send the OTP via email
    const user = await User.findById(req.params.userId);
    await emailOTPsender(req.body.changeEmail, otp);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    next(error);
  }
};
