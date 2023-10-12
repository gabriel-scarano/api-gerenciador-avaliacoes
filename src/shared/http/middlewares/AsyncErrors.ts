import { Request, Response, NextFunction } from "express";
import AppError from "@shared/errors/AppError";

function AsyncErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log(error.message);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}

export default AsyncErrors;