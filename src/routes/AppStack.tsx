import React, {FC, useContext, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import Signup from '../screens/login/Signup';
import Login from '../screens/login/Login';
import {UserContext} from '../context/UserContext';
import AppStackParamList from '../model/AppStackParamList';

const Stack = createNativeStackNavigator<AppStackParamList>();

type AppStackProps = {
  isExistingUser: boolean;
  directToHome: boolean;
  cachedID?: string;
};

const AppStack: FC<AppStackProps> = (props: AppStackProps) => {
  const userContext = useContext(UserContext);
  const {directToHome, isExistingUser, cachedID} = props;

  useEffect(() => {
    cachedID && userContext?.setUser({uid: cachedID});
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={
        directToHome ? 'AppDrawer' : isExistingUser ? 'Login' : 'Signup'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
    </Stack.Navigator>
  );
};

export default AppStack;
