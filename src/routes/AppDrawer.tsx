import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard/Dashboard';
import ViewSummary from '../screens/summary/ViewSummary';
import Settings from '../screens/settings/Settings';
// import {Icon} from 'native-base';

const Drawer = createDrawerNavigator();

// drawer navigation options
const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />

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
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
