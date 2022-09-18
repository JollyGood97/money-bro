type Transaction = {
  uid: string;
  type: 'Income' | 'Expense';
  amount: string;
  description: string;
  month: string;
  id: string;
};

export default Transaction;
