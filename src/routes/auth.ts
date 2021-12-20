import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET as string;

//---User signup route---
router.post(
  "/signup",
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 5 }).withMessage("Password is too short."),
  async (req, res) => {
    const validationErrors = validationResult(req);
    const { name, email, password } = await req.body;

    //Check validation errors
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });
      return res.json({ errors, data: null });
    }

    //Find if email already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        errors: [
          {
            msg: "Email already in use",
          },
        ],
        data: null,
      });
    }

    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //Create token
    const token = JWT.sign(
      { name: newUser.name, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: 360000,
      }
    );

    //Return values after passing all checks
    return res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  }
);

//---User login route---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Find if email exist
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
      data: null,
    });
  }

  //Find if password exist
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
    });
  }

  //Create token
  const token = JWT.sign({ name: user.name, email: user.email }, JWT_SECRET, {
    expiresIn: 360000,
  });

  //Return values if passing all checks
  return res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
});

export default router;
