// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.get("/", (req, res, next) => {
  res.json({
    message: "Hi There",
  });
});

//global error handler
app.use(globalErrorHandler);
export default app;
