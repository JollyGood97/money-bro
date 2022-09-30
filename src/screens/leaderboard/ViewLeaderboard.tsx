import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Leaderboard from './components/Leaderboard';

const Tab = createMaterialTopTabNavigator();

const ViewLeaderBoard = () => {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Monthly">
        {() => <Leaderboard type="Monthly" />}
      </Tab.Screen>
      <Tab.Screen name="Overall">
        {() => <Leaderboard type="Overall" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default ViewLeaderBoard;
