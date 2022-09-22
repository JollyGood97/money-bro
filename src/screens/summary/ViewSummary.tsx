import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SummaryList from './components/SummaryList';
import OverallSummary from './components/OverallSummary';
import {useGetIncomeExpenseQuery} from '../../api/baseApi';
import {UserContext} from '../../context/UserContext';
import {EXPENSE, INCOME} from '../../constants/Constants';

// import {Icon} from 'native-base';

const Tab = createMaterialTopTabNavigator();

// drawer navigation options
const ViewSummary = () => {
  const userContext = useContext(UserContext);

  const userID = userContext?.user?.uid || '';

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data = [],
  } = useGetIncomeExpenseQuery({uid: userID});

  const incomeData = data.filter(item => item.type === INCOME);
  const expenseData = data.filter(item => item.type === EXPENSE);

  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Income Summary">
        {() => <SummaryList data={incomeData} type={INCOME} />}
      </Tab.Screen>
      <Tab.Screen name="Expenses Summary">
        {() => <SummaryList data={expenseData} type={EXPENSE} />}
      </Tab.Screen>

      {/* <Tab.Screen name="Expenses Summary" component={ExpenseSummary} /> */}

      <Tab.Screen name="Overall Summary" component={OverallSummary} />
    </Tab.Navigator>
  );
};
export default ViewSummary;
