import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 5 }).withMessage("Password is too short."),
  async (req, res) => {
    const validationErrors = validationResult(req);
    const { email, password } = await req.body;

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });
      return res.json({ errors });
    }

    res.json({ email, password });
  }
);

export default router;
