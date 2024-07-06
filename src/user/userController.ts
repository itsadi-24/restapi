import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

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

  if (user) {
    const error = createHttpError(400, "user already exists");
    return next(error);
  }
  //Process
  //Response
  //   res.send("hello user");
};

export { createUser };
