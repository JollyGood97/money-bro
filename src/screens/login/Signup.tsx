import React, {FC, useContext, useState} from 'react';

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
  useColorModeValue,
} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AppStackParamList from '../../model/AppStackParamList';
import {UserContext} from './../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from 'lodash/isEmpty';
import AlertNotice from '../../common/Alert';

type SignupProps = NativeStackScreenProps<AppStackParamList, 'Signup'>;

const Signup: FC<SignupProps> = ({navigation}: SignupProps) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<any>({
    email: null,
    password: null,
    username: null,
    confirmPassword: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');

  const userContext = useContext(UserContext);

  const onSignupPress = () => {
    if (validateForm()) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async response => {
          const newUser = {
            uid: response?.user?.uid,
            email,
            username,
            currency: '$',
            leaderboardEnabled: false,
          };

          try {
            await AsyncStorage.setItem(
              'uid',
              JSON.stringify(response?.user?.uid),
            );
          } catch (e) {
            console.log('error');
          }

          userContext?.setUser(newUser);
          const usersCollection = firestore().collection('users');
          usersCollection
            .doc(newUser.uid)
            .set(newUser)
            .then(() => {
              navigation.navigate('AppDrawer');
            });
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);

          if (error.code === 'auth/email-already-in-use') {
            setIsLoading(false);
            setShowAlert(true);
            setAlertMsg('That email address is already in use!' + error);
          }

          if (error.code === 'auth/invalid-email') {
            setIsLoading(false);
            setShowAlert(true);
            setAlertMsg('Email address is invalid' + error);
          }

          setShowAlert(true);
          setAlertMsg('An unexpected error occurred: ' + error);
          setIsLoading(false);
        });
    }
  };

  const validateForm = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let isValid = true;

    if (isEmpty(username)) {
      setErrorMessages({
        ...errorMessages,
        username: 'Please enter a username',
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
    if (!isEmpty(email) && emailRegex.test(email) === false) {
      setErrorMessages({
        ...errorMessages,
        email: 'Please enter a valid email address',
      });
      isValid = false;
    }
    if (password !== confirmPassword) {
      setErrorMessages({
        ...errorMessages,
        confirmPassword: 'Passwords do not match',
      });
      isValid = false;
    }

    return isValid;
  };

  return (
    <Center w="100%" bg={useColorModeValue('#f5f5f4', 'black')} h="100%">
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
            color: 'white',
          }}
          fontWeight="semibold">
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'white',
          }}
          fontWeight="medium"
          size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errorMessages.username}>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              onChangeText={text => {
                setUsername(text);
                setErrorMessages({...errorMessages, username: null});
              }}
              value={username}
            />
            {errorMessages.username && (
              <FormControl.ErrorMessage>
                {errorMessages.username}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errorMessages.email}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              onChangeText={text => {
                setEmail(text);
                setErrorMessages({...errorMessages, email: null});
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
            <Input
              type="password"
              onChangeText={text => {
                setPassword(text);
                setErrorMessages({...errorMessages, password: null});
              }}
              value={password}
            />
            {errorMessages.password && (
              <FormControl.ErrorMessage>
                {errorMessages.password}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errorMessages.confirmPassword}>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={text => {
                setConfirmPassword(text);
                setErrorMessages({...errorMessages, confirmPassword: null});
              }}
              value={confirmPassword}
            />
            {errorMessages.confirmPassword && (
              <FormControl.ErrorMessage>
                {errorMessages.confirmPassword}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={onSignupPress}
            isLoading={isLoading}>
            Sign up
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'white',
              }}>
              I'm an existing user.{' '}
            </Text>
            <Link
              onPress={() => {
                navigation.navigate('Login');
              }}
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}>
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signup;
