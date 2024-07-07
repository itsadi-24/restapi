// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hi There",
  });
});
//if router is defined in some other file,its registered here
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
//global error handler
app.use(globalErrorHandler);
export default app;
