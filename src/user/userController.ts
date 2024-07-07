import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import userModel from "./userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

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
  try {
    const user = await userModel.findOne({ email: email });
    // checking if user already exists
    if (user) {
      const error = createHttpError(400, "user already exists");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting User"));
  }

  // hashing password
  const hashedPass = await bcrypt.hash(password, 10);

  // creating user
  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPass,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"));
  }

  try {
    //jwt token generation
    const token = sign({ sub: newUser._id }, config.jwtsecret as string, {
      expiresIn: "7d",
    });
    //Response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while sighning  the jwt token"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createHttpError(400, "All feilds are required"));
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(createHttpError(400, "User not found"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(createHttpError(400, "Invalid Credentials"));
  }

  //create accesstoken
  const token = sign({ sub: user._id }, config.jwtsecret as string, {
    expiresIn: "7d",
  });
  res.json({
    accesstoken: token,
  });
};

export { createUser, loginUser };
