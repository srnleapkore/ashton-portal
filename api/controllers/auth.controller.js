import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { firstname, lastname, email, phone, password, confirmpassword } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !confirmpassword ||
    firstname === "" ||
    lastname === "" ||
    email === "" ||
    phone === "" ||
    password === "" ||
    confirmpassword === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  if (password !== confirmpassword) {
    next(errorHandler(403, "Incorrect confirm password"));
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
    res.json("SIGNUP SUCCESSFULL");
  } catch (error) {
    next(error);
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
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_AUTH_KEY, {
      expiresIn: "1d",
    });

    const {password: pass, ...rest} = validUser._doc;

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
