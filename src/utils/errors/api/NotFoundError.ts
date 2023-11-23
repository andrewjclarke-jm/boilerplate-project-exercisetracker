import { HTTPStatusCodes } from "../../enums/index.js";
import InternalServerError from "./InternalServerError.js";

class NotFoundError extends InternalServerError {
  constructor(message: string) {
    super(message, HTTPStatusCodes.NOT_FOUND_ERROR);
  }
}

export default NotFoundError;
