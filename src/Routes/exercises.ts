import { Router } from "express";
import { createExerciseController } from "../controllers/index.js";
const router = Router();

router.route("/users/:id/exercises").post(createExerciseController);

export default router;
