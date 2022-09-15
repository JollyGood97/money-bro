import React, {useContext} from 'react';

// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import isEmpty from 'lodash';
import AppDrawer from './AppDrawer';
import Signup from '../screens/login/Signup';
import Login from '../screens/login/Login';
import {UserContext} from '../context/UserContext';
import AppStackParamList from '../model/AppStackParamList';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const userContext = useContext(UserContext);
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}>
      {!isEmpty(userContext?.user) ? (
        <Stack.Screen name="Drawer" component={AppDrawer} />
      ) : (
        <>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
