import User from "../models/user.model.js";
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
    return next(errorHandler(400, "New password and confirm password are not matching"));
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isMatch = bcryptjs.compareSync(req.body.currentPassword, user.password);
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
