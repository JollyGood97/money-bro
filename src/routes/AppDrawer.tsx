import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard/Dashboard';
import ViewSummary from '../screens/summary/ViewSummary';

const Drawer = createDrawerNavigator();

// drawer navigation options
const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
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

      <Drawer.Screen
        name="Summary"
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
    </Drawer.Navigator>
  );
};
export default AppDrawer;
