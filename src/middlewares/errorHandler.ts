import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../utils/enums/index.js";
import { InternalServerError } from "../utils/errors/index.js";
import { ValidationError } from "sequelize";

const errorHandlerMiddleware = (
  error: Error | ValidationError,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const errorObject = {
    message: "something went wrong",
    status: HTTPStatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (error instanceof InternalServerError) {
    errorObject.status = error.code;
    errorObject.message = error.message;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    errorObject.status = HTTPStatusCodes.BAD_REQUEST_ERROR;
    errorObject.message = (error as ValidationError).errors[0].message;
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    errorObject.status = HTTPStatusCodes.BAD_REQUEST_ERROR;
    errorObject.message = "Cannot create resource without existing parent";
  }

  return response
    .status(errorObject.status)
    .json({ error: errorObject.message });
};

export default errorHandlerMiddleware;
