import { HTTPStatusCodes } from "../../enums/index.js";
import InternalServerError from "./InternalServerError.js";

class BadRequestError extends InternalServerError {
  constructor(message: string) {
    super(message, HTTPStatusCodes.BAD_REQUEST_ERROR);
  }
}

export default BadRequestError;
