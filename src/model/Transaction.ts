type Transaction = {
  uid: string;
  type: 'Income' | 'Expense';
  amount: string;
  description: string;
  month: number;
  id: string;
};

export default Transaction;
