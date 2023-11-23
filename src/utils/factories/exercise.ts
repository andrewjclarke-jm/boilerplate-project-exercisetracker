export const generateExerciseObject = (
  userId: number,
  duration: number,
  description: string,
  date: string = new Date().toDateString()
) => {
  return { userId, duration, description, date };
};
