import { RequestHandler, Router } from "express";
const router = Router();

const exampleRouterHandler: RequestHandler = (request, response) => {
  response.send("connected");
};

router.route("/users").post(exampleRouterHandler).get(exampleRouterHandler);

export default router;
