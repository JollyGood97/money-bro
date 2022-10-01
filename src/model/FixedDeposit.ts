type FixedDeposit = {
  uid: string;
  id: string;
  bank: string;
  deposit: string;
  rate: string;
  paymentMode: string;
  period: string;
  startDate: any;
  calculationEnabled: boolean;
  createdAt?: any;
  outstandingAmount: string;
  renewalDate: any;
};

export default FixedDeposit;
