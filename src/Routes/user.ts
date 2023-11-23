import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
} from "../controllers/index.js";

const router = Router();

router.route("/users").post(createUserController).get(getAllUsersController);

export default router;
