import { RequestHandler } from "express";
import { NotFoundError } from "../utils/errors/index.js";

const routeNotFoundMiddleware: RequestHandler = (_request, _response) => {
  throw new NotFoundError("Route not found");
};

export default routeNotFoundMiddleware;
