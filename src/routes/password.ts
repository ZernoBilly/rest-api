import express from "express";
import { body, validationResult } from "express-validator";
import Password from "../models/password";
import User from "../models/user";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

import createPassword from "../utils/passwordGenerator/passwordGenerator";

const router = express.Router();
dotenv.config();

const CRYPTOJS_SECRET_KEY = process.env.CRYPTOJS_SECRET_KEY as string;

//---Create password route---
router.post("/create", async (req, res) => {
  const { _id, title, password, tag } = req.body;

  const user = await User.findOne({ _id });

  //Check if user exists
  if (!user) {
    return res.json({
      errors: [
        {
          msg: "User not found",
        },
      ],
    });
  }

  //Create new password
  const createdPassword = createPassword(
    password.length,
    password.hasNumbers,
    password.hasSymbols
  );

  //Encrypt password
  const encryptedPassword = await CryptoJS.AES.encrypt(
    createdPassword,
    CRYPTOJS_SECRET_KEY
  ).toString();

  //   const bytes = CryptoJS.AES.decrypt(encryptedPassword, CRYPTOJS_SECRET_KEY);
  //   const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

  //Create new password
  await Password.create({
    userID: user._id,
    title: title,
    password: encryptedPassword,
    tag: tag,
  });

  //Get all passwords for user
  const passwords = await Password.find({
    userID: _id,
  });

  return res.json({
    errors: [],
    data: {
      passwords: passwords,
    },
  });
});

//---Get all passwords for user route---
router.get("/getall", async (req, res) => {
  const { _id } = req.body;

  const passwords = await Password.find({
    userID: _id,
  });

  //Check if user has passwords
  if (!passwords.length) {
    return res.json({
      errors: [
        {
          msg: "No passwords found",
        },
      ],
      data: {
        passwords: passwords,
      },
    });
  }

  return res.json({
    errors: [],
    data: {
      passwords: passwords,
    },
  });
});

//---Delete password route---
router.delete("/delete", async (req, res) => {
  const { _id, userID } = req.body;

  await Password.deleteOne({ _id: _id });

  //Get all existing passwords
  const passwords = await Password.find({
    userID: userID,
  });

  return res.json({
    errors: [],
    data: {
      passwords: passwords,
    },
  });
});
export default router;
