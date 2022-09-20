import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Button, View} from 'react-native';
import {NativeBaseProvider, StorageManager, ColorMode} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Intro from './src/screens/Intro';
import Auth from './src/screens/Auth';
import AppDrawer from './src/routes/AppDrawer';
import UserProvider from './src/context/UserContext';
import AppStack from './src/routes/AppStack';

const App = () => {
  const [showRealApp, setShowRealApp] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

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

  console.log('App', authenticated);
  return (
    <UserProvider>
      <NavigationContainer>
        <NativeBaseProvider colorModeManager={colorModeManager}>
          {authenticated ? (
            <AppStack />
          ) : (
            <>
              {showRealApp ? (
                <SafeAreaView style={styles.container}>
                  <View style={styles.container}>
                    <Auth setAuthenticated={setAuthenticated} />
                    <Button
                      title="Show Intro Slider again"
                      onPress={() => setShowRealApp(false)}
                    />
                  </View>
                </SafeAreaView>
              ) : (
                <Intro setShowRealApp={setShowRealApp} />
              )}
            </>
          )}
        </NativeBaseProvider>
      </NavigationContainer>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
