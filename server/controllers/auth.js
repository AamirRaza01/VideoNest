import mongoose from "mongoose";
import userModel from "../models/user.js";
import bcrypt from "bcrypt"

export const signup =  (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let newUser = await userModel.create({
            name,
            email,
            password: hash,
          });
        }

        res.status(200).send("User has been created");
        console.log(newUser)
      });
    });
  } catch (err) {
    next(err);
  }
};
