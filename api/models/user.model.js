import { time } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
      default: "https://cdn2.f-cdn.com/files/download/38545966/4bce6b.jpg",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isProspect: {
      type: Boolean,
      default: false,
    },
    isInvestor: {
      type: Boolean,
      default: false,
    },
    isSalesStaff: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
