import { ExerciseLogInterface, UserInterface } from "../interfaces/index.js";

export const generateExerciseLog = (
  user: UserInterface,
  exercises: ExerciseLogInterface[]
) => {
  return {
    userId: user.id,
    username: user.username,
    logs: exercises,
    count: exercises.length,
  };
};
