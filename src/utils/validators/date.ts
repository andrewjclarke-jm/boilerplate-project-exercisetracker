export const isDateValid = (date: string) => {
  const dateRegEx = new RegExp(/[\d]{4}-[\d]{1,2}-[\d]{1,2}$/g);
  return dateRegEx.test(date);
};
