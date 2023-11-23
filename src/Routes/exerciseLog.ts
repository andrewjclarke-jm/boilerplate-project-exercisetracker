import { Router } from "express";
import { getExerciseLogsController } from "../controllers/index.js";
const router = Router();

router.route("/users/:id/logs").get(getExerciseLogsController);

export default router;
