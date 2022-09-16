type Transaction = {
  uid: string;
  type: 'Income' | 'Expense';
  amount: number;
  description: string;
  month: string;
  id: string;
};

export default Transaction;
