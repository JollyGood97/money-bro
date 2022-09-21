import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard/Dashboard';
import ViewSummary from '../screens/summary/OverallSummary';
import Settings from '../screens/settings/Settings';
import SummaryTabs from './SummaryTabs';
// import {Icon} from 'native-base';

const Drawer = createDrawerNavigator();

// drawer navigation options
const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />

      <Drawer.Screen
        name="View Summary"
        component={SummaryTabs}
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
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
