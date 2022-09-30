import Transaction from '../model/Transaction';

export const getFormattedDate = (date: Date): string => {
  return new Date(date).toISOString().substring(0, 10);
};

export const getCurrentMonth = (): number => {
  return new Date().getMonth();
};

export const getTotal = (data: Transaction[]): number => {
  let total = 0;

  data.forEach(transaction => {
    total = total + parseInt(transaction.amount, 10);
  });
  return total;
};
