import { HTTPStatusCodes } from "../../enums/index.js";
import InternalServerError from "./InternalServerError.js";

class ForbiddenError extends InternalServerError {
  constructor(message: string) {
    super(message, HTTPStatusCodes.FORBIDDEN_ERROR);
  }
}

export default ForbiddenError;
