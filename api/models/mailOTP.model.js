import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    expires: 300, // Set expiration time for 5 minutes
  },
});

const EMAILOTP = mongoose.model("EmailOTP", otpSchema);

export default EMAILOTP;
