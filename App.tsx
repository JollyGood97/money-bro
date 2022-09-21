import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Button, View} from 'react-native';
import {NativeBaseProvider, StorageManager, ColorMode} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Intro from './src/screens/Intro';
import Auth from './src/screens/Auth';
import AppDrawer from './src/routes/AppDrawer';
import UserProvider from './src/context/UserContext';
import AppStack from './src/routes/AppStack';

const App = () => {
  const [showRealApp, setShowRealApp] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  // useEffect(() => {
  //   const enable = async () => {
  //     await firestore().settings({
  //       persistence: true, // disable offline persistence
  //     });
  //   };

  //   enable();
  // }, []);

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
            <AppStack />
          ) : (
            // <SafeAreaView style={styles.container}>
            //   <View style={styles.container}>
            //     <Button
            //       title="Show Intro Slider again"
            //       onPress={() => setShowRealApp(false)}
            //     />
            //   </View>
            // </SafeAreaView>
            <Intro setShowRealApp={setShowRealApp} />
          )}
        </NativeBaseProvider>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
