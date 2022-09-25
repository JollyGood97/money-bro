import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard/Dashboard';
import ViewSummary from '../screens/summary/ViewSummary';
import Settings from '../screens/settings/Settings';
import ViewBankDetails from '../screens/bank/ViewBankDetails';
import ViewLeaderBoard from '../screens/leaderboard/ViewLeaderboard';
// import {Icon} from 'native-base';

const Drawer = createDrawerNavigator();

// drawer navigation options
const AppDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />

      <Drawer.Screen
        name="View Summary"
        component={ViewSummary}
        //   options={{
        //     drawerIcon: ({ focused, size }) => (
        //         <Icon
        //             name="home"
        //             size={size}
        //             color={focused ? 'red' : 'black'}
        //         />
        //     ),
        // }}
      />
      <Drawer.Screen name="Bank Details" component={ViewBankDetails} />
      <Drawer.Screen name="Leaderboard" component={ViewLeaderBoard} />

      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
