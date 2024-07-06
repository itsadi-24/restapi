import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import userModel from "./userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  //whenever a request comes it undergoes a certain steps
  const { name, email, password } = req.body;
  //   validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All feilds are required");
    return next(error);
    //we use next to pass error into global error handler
  }
  //db call
  const user = await userModel.findOne({ email: email });

  // checking if user already exists
  if (user) {
    const error = createHttpError(400, "user already exists");
    return next(error);
  }
  // hashing password
  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPass,
  });
  //jwt token generation
  const token = sign({ sub: newUser._id }, config.jwtsecret as string, {
    expiresIn: "7d",
  });

  //Response
  res.json({ accessToken: token });
};

export { createUser };
