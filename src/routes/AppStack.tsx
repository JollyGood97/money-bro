import React, {useContext, useEffect, useState} from 'react';

// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import isEmpty from 'lodash';
import AppDrawer from './AppDrawer';
import Signup from '../screens/login/Signup';
import Login from '../screens/login/Login';
import {UserContext} from '../context/UserContext';
import AppStackParamList from '../model/AppStackParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const userContext = useContext(UserContext);
  const [directToHome, setDirectToHome] = useState<boolean>(false);

  useEffect(() => {
    const getMode = async () => {
      const stayLoggedIn = await AsyncStorage.getItem('stayLoggedIn');

      if (stayLoggedIn) {
        console.log('stayLoggedIn', stayLoggedIn === 'true');
        setDirectToHome(stayLoggedIn === 'true');
      } else {
        !isEmpty(userContext?.user) && setDirectToHome(true);
      }
    };
    getMode();
  }, [userContext?.user]);

  return (
    <Stack.Navigator
      initialRouteName={directToHome ? 'AppDrawer' : 'Signup'}
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
