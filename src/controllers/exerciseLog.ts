import { RequestHandler } from "express";
import { ExerciseModel, UserModel } from "../models/all.js";
import { NotFoundError } from "../utils/errors/index.js";
import { generateExerciseLog } from "../utils/factories/exerciseLog.js";
import UserInterface from "../utils/interfaces/user.js";
import ExerciseInterface from "../utils/interfaces/exercise.js";

export const getExerciseLogsController: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    console.log("entered controller");
    // retrieve user id from request params
    const userId = request.params.id;
    const user = await UserModel.findByPk(+userId);

    if (!user) throw new NotFoundError("User does not exist");

    console.log(user.dataValues);
    // search for exercises created by the target user
    const exercises = await ExerciseModel.findAll({
      where: { userId: +userId },
    });

    // generate exercise log
    const exerciseLog = generateExerciseLog(
      user as unknown as UserInterface,
      exercises as unknown as ExerciseInterface[]
    );

    response
      .status(201)
      .json({ message: "exercise logs retrieved successfully!", exerciseLog });
  } catch (error) {
    next(error);
  }
};
