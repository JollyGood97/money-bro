import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ExpenseSummary from '../screens/summary/ExpenseSummary';
import IncomeSummary from '../screens/summary/IncomeSummary';
import OverallSummary from '../screens/summary/OverallSummary';

// import {Icon} from 'native-base';

const Tab = createMaterialTopTabNavigator();

// drawer navigation options
const SummaryTabs = () => {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Income Summary" component={IncomeSummary} />
      <Tab.Screen name="Expenses Summary" component={ExpenseSummary} />

      <Tab.Screen name="Overall Summary" component={OverallSummary} />
    </Tab.Navigator>
  );
};
export default SummaryTabs;
