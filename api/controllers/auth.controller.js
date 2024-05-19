import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";
import crypto from "crypto";
import verifymail from "../utils/mailSend.js";

export const signup = async (req, res, next) => {
  const { firstname, lastname, email, phone, password, confirmpassword } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !confirmpassword
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (password !== confirmpassword) {
    return next(errorHandler(403, "Passwords do not match"));
  }

  const hashedpassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    firstname,
    lastname,
    email,
    phone,
    password: hashedpassword,
  });

  try {
    await newUser.save();

    const verificationToken = new Token({
      userId: newUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    await verificationToken.save();

    const verificationLink = `http://localhost:3000/api/auth/verify/${verificationToken.token}`;
    console.log(verificationLink);

    await verifymail(newUser.email, verificationLink, newUser.firstname);

    res.status(200).send({
      message: "Email sent, check your email to verify your account",
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (user.isAccountVerified) {
      return next(errorHandler(400, "Account is already verified"));
    }

    const verificationToken = await Token.findOne({ userId: user._id });
    if (!verificationToken) {
      const newToken = new Token({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await newToken.save();
      const verificationLink = `http://localhost:3000/api/auth/verify/${newToken.token}`;
      await verifymail(user.email, verificationLink, user.firstname);
    } else {
      const verificationLink = `http://localhost:3000/api/auth/verify/${verificationToken.token}`;
      await verifymail(user.email, verificationLink, user.firstname);
    }

    res.status(200).send({ message: "Verification email resent" });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });

    if (!token) {
      return res.redirect(
        "http://localhost:5173/login?activationerror=Invalid%20activation%20token"
      );
    }

    await User.updateOne(
      { _id: token.userId },
      { $set: { isAccountVerified: true } }
    );

    await Token.findByIdAndDelete(token._id);
    res.redirect(
      "http://localhost:5173/login?activationsuccess=Account%20verified%20successfully.%20Login%20now!"
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    res.redirect(
      "http://localhost:5173/login?activationerror=Invalid%20activation%20token"
    );
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Email not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Incorrect credentials"));
    }

    if (!validUser.isAccountVerified) {
      return next(
        errorHandler(403, "Verify your account to login. Check your inbox.")
      );
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_AUTH_KEY, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
