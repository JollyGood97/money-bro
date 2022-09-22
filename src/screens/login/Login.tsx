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
} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AppStackParamList from '../../model/AppStackParamList';
// import {INCOME, EXPENSE} from '../../common/constants/Constants';
import {UserContext} from './../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from '../Auth';
import {SafeAreaView, StyleSheet} from 'react-native';
import User from '../../model/User';

type LoginProps = NativeStackScreenProps<AppStackParamList, 'Login'>;

const Login: FC<LoginProps> = ({navigation}: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const userContext = useContext(UserContext);

  const setUID = useCallback(async () => {
    const cachedUID = await AsyncStorage.getItem('uid');

    if (cachedUID) {
      //  console.log('isDarkModeEnabled', isDarkModeEnabled === 'true');
      userContext?.setUser({uid: cachedUID});
    }
  }, [userContext]);

  // useEffect(() => {}, [authenticated, setUID, navigation]);

  useEffect(() => {
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
              //  setLoading(false)
            });
        } else {
          // setLoading(false)
        }
      });
      console.log('test');
      //  setUID();
    }
    // have to figure out how to avoid passing user context as dependency
  }, [authenticated, navigation]);

  const onLoginPress = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        const usersCollection = firestore().collection('users');
        usersCollection
          .doc(uid)
          .get()
          .then(async document => {
            if (!document.exists) {
              console.log('user not found');
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
              try {
                await AsyncStorage.setItem(
                  'uid',
                  JSON.stringify(response?.user?.uid),
                );
              } catch (e) {
                console.log('error');
              }
              navigation.navigate('AppDrawer');
            }
          });
      });
  };

  // danger.200 for light mode.
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold">
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
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={text => setEmail(text)} value={email} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </FormControl>

          <Button mt="2" colorScheme="indigo" onPress={onLoginPress}>
            Login
          </Button>
          <HStack mt="6" justifyContent="center">
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

            <Checkbox
              isChecked={stayLoggedIn}
              colorScheme="info"
              value={'stayLoggedIn'}
              onChange={async () => {
                setStayLoggedIn(!stayLoggedIn);
                if (stayLoggedIn) {
                  try {
                    await AsyncStorage.setItem('stayLoggedIn', 'true');
                  } catch (e) {
                    console.log('Error');
                  }
                }
              }}>
              Keep me signed in
            </Checkbox>
          </HStack>
        </VStack>
        <VStack>
          <Text> Or use your fingerprint to login:</Text>

          <Auth setAuthenticated={setAuthenticated} />
        </VStack>
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
