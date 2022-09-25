import React, {FC, useState, useRef, useEffect, useContext} from 'react';
import {
  HStack,
  Center,
  View,
  Text,
  Button,
  Switch,
  useColorMode,
  VStack,
  useColorModeValue,
} from 'native-base';

import {ScrollView} from 'react-native-gesture-handler';
// @ts-ignore
import CurrencyPicker from 'react-native-currency-picker';
import {UserContext} from './../../context/UserContext';
import User from '../../model/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

type SettingsProps = {};

const Settings: FC<SettingsProps> = (props: SettingsProps) => {
  const {} = props;

  const {toggleColorMode} = useColorMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    useColorModeValue('Light', 'Dark'),
  );
  let currencyPickerRef: any;
  const userContext = useContext(UserContext);

  // Add sign out and select currency option & stay logged in options

  // useEffect(() => {
  //   const getMode = async () => {
  //     const isDarkModeEnabled = await AsyncStorage.getItem('isDarkModeEnabled');

  //     if (isDarkModeEnabled) {
  //       console.log('isDarkModeEnabled', isDarkModeEnabled === 'true');
  //       setIsDarkMode(isDarkModeEnabled === 'true');
  //     }else{
  //       setIsDarkMode(false);
  //     }
  //   };
  //   getMode();
  // }, []);

  // const setMode = async (value: boolean) => {
  //   try {
  //     await AsyncStorage.setItem('isDarkModeEnabled', JSON.stringify(value));
  //   } catch (e) {
  //     return;
  //   }
  // };
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View padding={10}>
        <Center>
          <VStack>
            <HStack space={5}>
              <Text>Use Dark Mode</Text>
              <Switch
                offTrackColor="indigo.100"
                onTrackColor="indigo.200"
                onThumbColor="indigo.500"
                offThumbColor="indigo.50"
                onToggle={() => {
                  toggleColorMode();
                  setIsDarkMode(!isDarkMode);
                }}
                isChecked={isDarkMode}
              />
            </HStack>
            <HStack>
              {/* <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => {
                  currencyPickerRef?.open();
                }}>
                Currency
              </Button> */}
              <Text>Select Currency: </Text>
              <CurrencyPicker
                currencyPickerRef={(ref: any) => {
                  currencyPickerRef = ref;
                }}
                enable={true}
                darkMode={false}
                currencyCode={'EUR'}
                showFlag={true}
                showCurrencyName={true}
                showCurrencyCode={true}
                onSelectCurrency={(data: any) => {
                  console.log('currency', data);
                }}
                showNativeSymbol={false}
                showSymbol={true}
              />
            </HStack>
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={async () => {
                userContext?.setUser({} as User);
                // try {
                //   await AsyncStorage.removeItem('uid');
                // } catch (e) {
                //   console.log('Error');
                // }
                try {
                  await AsyncStorage.setItem('stayLoggedIn', 'false');
                } catch (e) {
                  console.log('Error');
                }
                navigation.navigate('Login');
                // navigation.navigate('');
              }}>
              Sign Out
            </Button>
          </VStack>
        </Center>
      </View>
    </ScrollView>
  );
};

export default Settings;

// const styles = StyleSheet.create({
//   circleRed: {
//     width: 20,
//     height: 20,
//     borderRadius: 20 / 2,
//     backgroundColor: '#e11d48',
//   },
//   circleGreen: {
//     width: 20,
//     height: 20,
//     borderRadius: 20 / 2,
//     backgroundColor: '#16a34a',
//   },
// });
