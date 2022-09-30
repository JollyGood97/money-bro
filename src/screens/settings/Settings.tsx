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
  Pressable,
  Spacer,
} from 'native-base';

import {ScrollView} from 'react-native-gesture-handler';
// @ts-ignore
import CurrencyPicker from 'react-native-currency-picker';
import {UserContext} from './../../context/UserContext';
import User from '../../model/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEnableLeaderboardMutation} from '../../api/baseApi';
import ChangeCurrencyModal from './components/ChangeCurrencyModal';
import AlertNotice from '../../common/Alert';
import AlertMsg from '../../model/AlertMsg';

type SettingsProps = {};

const Settings: FC<SettingsProps> = (props: SettingsProps) => {
  const {} = props;

  const userContext = useContext(UserContext);
  const [enableLeaderboard, {isLoading}] = useEnableLeaderboardMutation();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMsg>({} as AlertMsg);

  const {toggleColorMode} = useColorMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    useColorModeValue('Light', 'Dark'),
  );
  const [leaderboardEnabled, setLeaderboardEnabled] = useState<boolean>(
    userContext?.user?.leaderboardEnabled || false,
  );
  const [showChangeCurrencyModal, setShowChangeCurrencyModal] =
    useState<boolean>(false);
  console.log('leaderboardEnabled', leaderboardEnabled);
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
      <View m={8}>
        <Center>
          {showAlert && (
            <AlertNotice
              alertType={alertMessage.alertType}
              message={alertMessage.message}
              setShowAlert={setShowAlert}
            />
          )}
        </Center>
        <Center>
          <VStack space={5}>
            <HStack
              bg="indigo.100"
              rounded="lg"
              paddingLeft={5}
              paddingTop={5}
              paddingRight={3}
              paddingBottom={5}>
              <Text bold fontSize={18}>
                Use Dark Mode
              </Text>
              <Spacer />
              <Switch
                offTrackColor="indigo.900"
                onTrackColor="indigo.200"
                onThumbColor="indigo.500"
                offThumbColor="indigo.50"
                onToggle={() => {
                  toggleColorMode();
                  setIsDarkMode(!isDarkMode);
                }}
                isChecked={!isDarkMode}
              />
            </HStack>
            <HStack space={10} bg="indigo.100" rounded="lg" p="5">
              <Text bold fontSize={18}>
                Change Username
              </Text>
            </HStack>
            <Pressable
              onPress={() => {
                setShowChangeCurrencyModal(true);
              }}>
              <HStack space={10} bg="indigo.100" rounded="lg" p="5">
                <Text bold fontSize={18}>
                  Change Currency
                </Text>
              </HStack>
            </Pressable>

            <HStack space={10} bg="indigo.100" rounded="lg" p="5">
              <Text bold fontSize={18}>
                Enable Leaderboard*
              </Text>
              <Switch
                offTrackColor="indigo.900"
                onTrackColor="indigo.200"
                onThumbColor="indigo.500"
                offThumbColor="indigo.50"
                onToggle={() => {
                  setLeaderboardEnabled(!leaderboardEnabled);
                  enableLeaderboard({
                    uid: userContext?.user?.uid,
                    leaderboardEnabled: !leaderboardEnabled,
                  });
                }}
                isChecked={leaderboardEnabled}
              />
            </HStack>
            <Pressable
              onPress={async () => {
                userContext?.setUser({} as User);
                try {
                  await AsyncStorage.setItem('stayLoggedIn', 'false');
                } catch (e) {
                  console.log('Error');
                }
                navigation.navigate('Login');
              }}>
              <HStack space={10} bg="indigo.100" rounded="lg" p="5">
                <Text bold fontSize={18}>
                  Sign Out
                </Text>
              </HStack>
            </Pressable>
          </VStack>
          <Text marginTop={5}>
            *Please note that if you enable this, your data will be used to
            determine your rank in the leaderboard. However, other users will
            not see your actual data on the leaderboard, only will see
            percentage wise. The change will be made on the restart of the
            application.
          </Text>
        </Center>
      </View>
      <ChangeCurrencyModal
        showModal={showChangeCurrencyModal}
        setShowModal={setShowChangeCurrencyModal}
        userID={userContext?.user?.uid || ''}
        currentCurrency={userContext?.user?.currency || ''}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
      />
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
