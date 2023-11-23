import { RequestHandler } from "express";
import { BadRequestError, ForbiddenError } from "../utils/errors/index.js";
import { generateExerciseObject } from "../utils/factories/exercise.js";
import { ExerciseModel } from "../models/all.js";
import { isDateValid } from "../utils/validators/index.js";

export const createExerciseController: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    // pull id from request params
    const userId = request.params.id;
    if (!userId) new ForbiddenError("Must provide id parameter!");

    // pull values from request body and perform sequential validation
    const description = request.body.description;
    if (!description) throw new BadRequestError("Description is required!");

    const duration = request.body.duration;
    if (!duration) throw new BadRequestError("Duration is required!");

    let date = request.body.date;
    const isValid = isDateValid(date);

    if (!date) date = new Date().toISOString().split("T")[0];
    else if (!isValid)
      throw new BadRequestError("Date format should be YYYY-MM-DD");

    // create exercise object
    const exerciseFromFactory = generateExerciseObject(
      +userId,
      duration,
      description,
      date
    );

    const exerciseFromModel = await ExerciseModel.create(exerciseFromFactory);

    response.status(201).json({
      message: "exercise created successfully!",
      exercise: exerciseFromModel,
    });
  } catch (error) {
    next(error);
  }
};
