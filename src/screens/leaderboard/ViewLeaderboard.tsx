import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useGetAllUsersIncomeExpenseQuery} from '../../api/baseApi';
import {UserContext} from '../../context/UserContext';
import {EXPENSE, INCOME} from '../../constants/Constants';
import Leaderboard from './components/Leaderboard';

// import {Icon} from 'native-base';

const Tab = createMaterialTopTabNavigator();

// drawer navigation options
const ViewLeaderBoard = () => {
  const userContext = useContext(UserContext);

  const userID = userContext?.user?.uid || '';

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data = [],
  } = useGetAllUsersIncomeExpenseQuery('');

  const incomeData = data.filter(item => item.type === INCOME);
  const expenseData = data.filter(item => item.type === EXPENSE);

  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Monthly">
        {() => <Leaderboard data={incomeData} type="Monthly" />}
      </Tab.Screen>
      <Tab.Screen name="Overall">
        {() => <Leaderboard data={expenseData} type="Overall" />}
      </Tab.Screen>

      {/* <Tab.Screen name="Expenses Summary" component={ExpenseSummary} /> */}
    </Tab.Navigator>
  );
};
export default ViewLeaderBoard;
