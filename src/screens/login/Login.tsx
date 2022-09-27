import React, {FC, useContext, useEffect, useState, useCallback} from 'react';

import {
  Button,
  Input,
  FormControl,
  Text,
  Box,
  Center,
  Heading,
  VStack,
  HStack,
  Link,
  Checkbox,
  View,
  Divider,
  useColorModeValue,
  CloseIcon,
  CheckIcon,
} from 'native-base';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AppStackParamList from '../../model/AppStackParamList';
// import {INCOME, EXPENSE} from '../../common/constants/Constants';
import {UserContext} from './../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FingerprintScan from './components/FingerprintScan';
import {Pressable, SafeAreaView, StyleSheet} from 'react-native';
import User from '../../model/User';
import isEmpty from 'lodash/isEmpty';
import AlertNotice from '../../common/Alert';

type LoginProps = NativeStackScreenProps<AppStackParamList, 'Login'>;

const Login: FC<LoginProps> = ({navigation}: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<any>({
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');

  // const setUID = useCallback(async () => {
  //   const cachedUID = await AsyncStorage.getItem('uid');
  //   if (cachedUID) {
  //     setCachedID(cachedUID);
  //     //  console.log('isDarkModeEnabled', isDarkModeEnabled === 'true');
  //     // userContext?.setUser({uid: cachedUID});
  //   }
  // }, []);

  // const cachedUID = async () => {
  //   return await AsyncStorage.getItem('uid');
  // };

  // useEffect(() => {
  //   setUID();
  // }, [setUID]);
  // console.log('uid', userContext?.user?.uid);

  // useEffect(() => {
  //   setAuthenticated(authenticated);
  // }, [authenticated]);

  // useEffect(() => {
  //   setUID();
  // }, [authenticated, setUID, navigation]);

  useEffect(() => {
    console.log('authenticated', authenticated);
    if (authenticated) {
      const usersRef = firestore().collection('users');
      auth().onAuthStateChanged(user => {
        if (user) {
          usersRef
            .doc(user.uid)
            .get()
            .then(document => {
              const userData = document.data() as User;
              userData && userContext?.setUser(userData);
              navigation.navigate('AppDrawer');
            })
            .catch(error => {
              setShowAlert(true);
              setAlertMsg('An unexpected error occurred: ' + error);
              setIsLoading(false);
            });
        } else {
          setShowAlert(true);
          setAlertMsg('User not found');
        }
      });
    }
    // have to figure out how to avoid passing user context as dependency
  }, [authenticated, navigation]);

  const validateForm = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let isValid = true;

    if (isEmpty(email) && isEmpty(password)) {
      setErrorMessages({
        email: 'Please enter your email address',
        password: 'Please enter your password',
      });
      isValid = false;
    }
    if (isEmpty(email)) {
      setErrorMessages({
        ...errorMessages,
        email: 'Please enter your email address',
      });
      isValid = false;
    }
    if (isEmpty(password)) {
      setErrorMessages({
        ...errorMessages,
        password: 'Please enter your password',
      });
      isValid = false;
    }
    if (emailRegex.test(email) === false) {
      setErrorMessages({
        ...errorMessages,
        email: 'Please enter a valid email address',
      });
      isValid = false;
    }

    return isValid;
  };

  const onLoginPress = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        await auth()
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            const uid = response.user.uid;
            const usersCollection = firestore().collection('users');
            usersCollection
              .doc(uid)
              .get()
              .then(async document => {
                if (!document.exists) {
                  setShowAlert(true);
                  setAlertMsg('User not found');
                  return;
                }
                const existingUser = document.data();
                if (existingUser) {
                  userContext?.setUser({
                    uid: existingUser.uid,
                    email: existingUser.email,
                    username: existingUser.username,
                    currency: userContext?.user?.currency,
                  });
                  setIsLoading(false);
                  try {
                    await AsyncStorage.setItem(
                      'uid',
                      JSON.stringify(response?.user?.uid),
                    );
                  } catch (e) {
                    setIsLoading(false);
                  }
                  navigation.navigate('AppDrawer');
                }
              });
          });
      } catch (e) {
        setShowAlert(true);
        setAlertMsg('User not found');
        setIsLoading(false);
      }
    }
  };

  // danger.200 for light mode.
  return (
    <Center w="100%" bg={useColorModeValue('#fafaf9', 'black')} h="100%">
      {showAlert && (
        <AlertNotice
          alertType="error"
          message={alertMsg}
          setShowAlert={setShowAlert}
        />
      )}

      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="bold">
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs">
          Login to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errorMessages.email}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              onChangeText={text => {
                setEmail(text);
                setErrorMessages({...errorMessages, email: null});
                setShowAlert(false);
              }}
              value={email}
            />
            {errorMessages.email && (
              <FormControl.ErrorMessage>
                {errorMessages.email}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errorMessages.password}>
            <FormControl.Label>Password</FormControl.Label>
            {/* <Input w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" /> */}
            <Input
              type="password"
              onChangeText={text => {
                setPassword(text);
                setErrorMessages({...errorMessages, password: null});
                setShowAlert(false);
              }}
              value={password}
            />
            {errorMessages.password && (
              <FormControl.ErrorMessage>
                {errorMessages.password}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <Checkbox
            isChecked={stayLoggedIn}
            colorScheme="info"
            value={'stayLoggedIn'}
            onChange={async isEnabled => {
              setStayLoggedIn(isEnabled);
              if (isEnabled) {
                try {
                  await AsyncStorage.setItem('stayLoggedIn', 'true');
                } catch (e) {
                  console.log('Error');
                }
              }
            }}>
            <Text fontSize="sm">Keep me signed in</Text>
          </Checkbox>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={onLoginPress}
            isLoading={isLoading}>
            Login
          </Button>
          <HStack mt="1" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
        <Divider
          my="6"
          _light={{
            bg: 'muted.800',
          }}
          _dark={{
            bg: 'muted.50',
          }}
        />
        {userContext?.user?.uid ? (
          <VStack>
            <Text marginBottom={2}>
              You can also use your fingerprint to login:
            </Text>
            <FingerprintScan setAuthenticated={setAuthenticated} />
          </VStack>
        ) : (
          <VStack>
            <Text>
              Fingerprint Authentication is not available on first time sign in.
            </Text>
          </VStack>
        )}
      </Box>
    </Center>
  );
};

export default Login;

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
