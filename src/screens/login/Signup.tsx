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
} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AppStackParamList from '../../model/AppStackParamList';
import {UserContext} from './../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {INCOME, EXPENSE} from '../../common/constants/Constants';

type SignupProps = NativeStackScreenProps<AppStackParamList, 'Signup'>;

const Signup: FC<SignupProps> = ({navigation}: SignupProps) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const userContext = useContext(UserContext);

  const onSignupPress = () => {
    if (password !== confirmPassword) {
      console.log("Passwords don't match.");
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async response => {
        console.log('User account created & signed in!');
        const newUser = {
          uid: response?.user?.uid,
          email,
          username,
          currency: '$',
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
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
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
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input onChangeText={text => setUsername(text)} value={username} />
          </FormControl>
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
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={onSignupPress}>
            Sign up
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
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
