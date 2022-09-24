export const getFormattedDate = (date: Date): string => {
  return new Date(date).toISOString().substring(0, 10);
};
