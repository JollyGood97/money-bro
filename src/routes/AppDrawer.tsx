import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
        },
        drawerLabelStyle: {
          fontSize: 18,
        },
        drawerInactiveTintColor: '#3730a3',
        drawerActiveTintColor: 'black',
        drawerActiveBackgroundColor: '#c7d2fe',
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? 'black' : '#3730a3'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="View Summary"
        component={ViewSummary}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="clipboard-text-multiple"
              size={size}
              color={focused ? 'black' : '#3730a3'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Bank Details"
        component={ViewBankDetails}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="bank"
              size={size}
              color={focused ? 'black' : '#3730a3'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Leaderboard"
        component={ViewLeaderBoard}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="medal"
              size={size}
              color={focused ? 'black' : '#3730a3'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="cog"
              size={size}
              color={focused ? 'black' : '#3730a3'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
