import React, {useContext, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SummaryList from './components/SummaryList';
import OverallSummary from './components/OverallSummary';
import {useGetIncomeExpenseQuery} from '../../api/BaseApi';
import {UserContext} from '../../context/UserContext';
import {EXPENSE, INCOME, month} from '../../constants/Constants';
import Transaction from '../../model/Transaction';
import MonthlyData from '../../model/MonthlyData';
import isEmpty from 'lodash/isEmpty';

const Tab = createMaterialTopTabNavigator();

const ViewSummary = () => {
  const userContext = useContext(UserContext);
  const userID = userContext?.user?.uid || '';
  const userCurrency = userContext?.user?.currency || '';

  const {isLoading, data = []} = useGetIncomeExpenseQuery({uid: userID});
  const [overallIncome, setOverallIncome] = useState<number>(0);
  const [overallExpense, setOverallExpense] = useState<number>(0);
  const [monthlyIncomeData, setMonthlyIncomeData] = useState<MonthlyData[]>([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState<MonthlyData[]>(
    [],
  );

  const getMonthlyData = (
    transactionData: Transaction[],
    type: 'Income' | 'Expense',
  ): MonthlyData[] => {
    let formattedData: MonthlyData[] = [];
    let total = 0;
    month.forEach((monthInText, key: number) => {
      const dataForMonth = transactionData.filter(
        monthlyData => monthlyData.month === key,
      );

      if (!isEmpty(dataForMonth)) {
        formattedData.push({month: monthInText, data: dataForMonth});

        dataForMonth.forEach(transaction => {
          total = total + parseInt(transaction.amount, 10);
        });
        type === INCOME ? setOverallIncome(total) : setOverallExpense(total);
      }
    });
    return formattedData;
  };

  useEffect(() => {
    if (!isLoading && data) {
      setMonthlyIncomeData(
        getMonthlyData(
          data.filter(item => item.type === INCOME),
          INCOME,
        ),
      );
      setMonthlyExpenseData(
        getMonthlyData(
          data.filter(item => item.type === EXPENSE),
          EXPENSE,
        ),
      );
    }
  }, [data, isLoading]);

  const getTotalPerMonth = (
    dataForMonth: Transaction[],
    type: 'Income' | 'Expense',
  ): number => {
    let total = 0;

    dataForMonth.forEach(transaction => {
      total = total + parseInt(transaction.amount, 10);
    });
    type === INCOME
      ? setOverallIncome(overallIncome + total)
      : setOverallExpense(overallExpense + total);
    return total;
  };

  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Overall Summary">
        {() => (
          <OverallSummary
            overallIncome={overallIncome}
            overallExpense={overallExpense}
            userCurrency={userCurrency}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Income Summary">
        {() => (
          <SummaryList
            data={monthlyIncomeData}
            type={INCOME}
            getTotalPerMonth={getTotalPerMonth}
            userCurrency={userCurrency}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Expenses Summary">
        {() => (
          <SummaryList
            data={monthlyExpenseData}
            type={EXPENSE}
            getTotalPerMonth={getTotalPerMonth}
            userCurrency={userCurrency}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default ViewSummary;
