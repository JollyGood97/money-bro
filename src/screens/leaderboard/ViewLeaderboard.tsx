import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useGetAllUsersQuery} from '../../api/baseApi';
import {UserContext} from '../../context/UserContext';
import {EXPENSE, INCOME} from '../../constants/Constants';
import Leaderboard from './components/Leaderboard';

// import {Icon} from 'native-base';

const Tab = createMaterialTopTabNavigator();

// drawer navigation options
const ViewLeaderBoard = () => {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Monthly">
        {() => <Leaderboard type="Monthly" />}
      </Tab.Screen>
      <Tab.Screen name="Overall">
        {() => <Leaderboard type="Overall" />}
      </Tab.Screen>

      {/* <Tab.Screen name="Expenses Summary" component={ExpenseSummary} /> */}
    </Tab.Navigator>
  );
};
export default ViewLeaderBoard;
