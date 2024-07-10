import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { errorHandler } from "../errorHandler.js";
import jwt from "jsonwebtoken";
import user from "../models/User.js";

export const signup = async (req, res, next) => {

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new user({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};


export const signin = async (req, res, next) => {
  try {

    const foundUser = await user.findOne({ name: req.body.name });

    if (!foundUser) return next(errorHandler(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, foundUser.password);
    if (!isCorrect) return next(errorHandler(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_KEY);
    const { password, ...others } = foundUser._doc;

    res
      .cookie("access_token", token, {httpOnly: true})
      .status(200)
      .json(others);
  } catch (err) {
    console.error("Signin error:", err);  
    next(err);
  }
};




export const googleAuth = async (req, res, next) => {
  try {
    const user = await user.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new user({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};

