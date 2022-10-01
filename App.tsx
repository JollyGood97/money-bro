import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, StorageManager, ColorMode} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IntroSlider from './src/screens/intro/IntroSlider';
import UserProvider from './src/context/UserContext';
import AppStack from './src/routes/AppStack';

const App = () => {
  const [showRealApp, setShowRealApp] = useState<boolean>(false);

  const [directToHome, setDirectToHome] = useState<boolean>(false);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);
  const [cachedID, setCachedID] = useState<string | undefined>('');

  useEffect(() => {
    const setPreferences = async () => {
      const stayLoggedIn = await AsyncStorage.getItem('stayLoggedIn');
      const userID = await AsyncStorage.getItem('uid');

      userID && setIsExistingUser(true);
      userID && setCachedID(userID);
      if (stayLoggedIn) {
        console.log('stayLoggedIn', stayLoggedIn);
        setDirectToHome(stayLoggedIn === 'true');
      }
    };
    setPreferences();
  }, []);

  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        value && (await AsyncStorage.setItem('@color-mode', value));
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <UserProvider>
      <NavigationContainer>
        <NativeBaseProvider colorModeManager={colorModeManager}>
          {showRealApp ? (
            <AppStack
              directToHome={directToHome}
              isExistingUser={isExistingUser}
              cachedID={cachedID}
            />
          ) : (
            <IntroSlider setShowRealApp={setShowRealApp} />
          )}
        </NativeBaseProvider>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
