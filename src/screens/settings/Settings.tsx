import React, {FC, useState, useContext} from 'react';
import {
  HStack,
  Center,
  View,
  Text,
  Switch,
  useColorMode,
  VStack,
  useColorModeValue,
  Pressable,
  Spacer,
} from 'native-base';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';

import {UserContext} from './../../context/UserContext';
import User from '../../model/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEnableLeaderboardMutation} from '../../api/BaseApi';
import ChangeCurrencyModal from './components/ChangeCurrencyModal';
import AlertNotice from '../../common/Alert';
import AlertMsg from '../../model/AlertMsg';
import ChangeUsernameModal from './components/ChangeUsernameModal';

type SettingsProps = {};

const Settings: FC<SettingsProps> = (props: SettingsProps) => {
  const {} = props;

  const userContext = useContext(UserContext);
  const [enableLeaderboard] = useEnableLeaderboardMutation();
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
  const [showChangeUsernameModal, setShowChangeUsernameModal] =
    useState<boolean>(false);

  const navigation = useNavigation();

  return (
    <ScrollView>
      {showAlert && (
        <AlertNotice
          alertType={alertMessage.alertType}
          message={alertMessage.message}
          setShowAlert={setShowAlert}
        />
      )}
      <View height="100%" bg={useColorModeValue('#f5f5f4', '#000e21')} p={8}>
        <Center>
          <VStack space={5}>
            <HStack
              bg="indigo.100"
              rounded="lg"
              paddingLeft={5}
              paddingTop={5}
              paddingRight={3}
              paddingBottom={5}>
              <Text bold fontSize={18} _dark={{color: '#000e21'}}>
                Use Dark Mode
              </Text>
              <Spacer />
              <Switch
                offTrackColor="indigo.900"
                onTrackColor="indigo.400"
                onThumbColor="indigo.600"
                offThumbColor="indigo.50"
                onToggle={() => {
                  toggleColorMode();
                  setIsDarkMode(!isDarkMode);
                }}
                isChecked={!isDarkMode}
              />
            </HStack>
            <Pressable
              onPress={() => {
                setShowChangeUsernameModal(true);
              }}>
              <HStack space={10} bg="indigo.100" rounded="lg" p="5">
                <Text bold fontSize={18} _dark={{color: '#000e21'}}>
                  Change Username
                </Text>
                <Spacer />
                <Icon name="pencil" size={24} color="#312e81" />
              </HStack>
            </Pressable>

            <Pressable
              onPress={() => {
                setShowChangeCurrencyModal(true);
              }}>
              <HStack space={10} bg="indigo.100" rounded="lg" p="5">
                <Text bold fontSize={18} _dark={{color: '#000e21'}}>
                  Change Currency
                </Text>
                <Spacer />
                <Text bold color="indigo.900" fontSize={18}>
                  {userContext?.user?.currency}
                </Text>
              </HStack>
            </Pressable>

            <HStack space={10} bg="indigo.100" rounded="lg" p="5">
              <Text bold fontSize={18} _dark={{color: '#000e21'}}>
                Enable Leaderboard*
              </Text>
              <Switch
                offTrackColor="indigo.900"
                onTrackColor="indigo.400"
                onThumbColor="indigo.600"
                offThumbColor="indigo.50"
                onToggle={() => {
                  setLeaderboardEnabled(!leaderboardEnabled);
                  enableLeaderboard({
                    uid: userContext?.user?.uid,
                    leaderboardEnabled: !leaderboardEnabled,
                  });
                  userContext?.setUser({
                    ...(userContext?.user as User),
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
                //@ts-ignore
                navigation.navigate('Login');
              }}>
              <HStack space={10} bg="indigo.100" rounded="lg" p="5">
                <Text bold fontSize={18} _dark={{color: '#000e21'}}>
                  Sign Out
                </Text>
                <Spacer />
                <Icon name="logout" size={28} color="#312e81" />
              </HStack>
            </Pressable>
          </VStack>
          <Text marginTop={5}>
            *Please note that if you enable this, your data will be used to
            determine your rank in the leaderboard. However, other users will
            not see your actual data on the leaderboard, only will see
            percentage wise.
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
      <ChangeUsernameModal
        showModal={showChangeUsernameModal}
        setShowModal={setShowChangeUsernameModal}
        userID={userContext?.user?.uid || ''}
        currentUsername={userContext?.user?.username || ''}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
      />
    </ScrollView>
  );
};

export default Settings;
