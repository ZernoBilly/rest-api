import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });
  }

  token = token.split(" ")[1];

  try {
    const user = (await JWT.verify(token, JWT_SECRET)) as { email: string };
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });
  }
};
