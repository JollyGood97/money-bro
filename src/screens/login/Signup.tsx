import React, {FC, useState} from 'react';

import {
  InputGroup,
  InputRightAddon,
  Button,
  Input,
  Modal,
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
import AppStackParamList from '../../model/AppStackParamList';
// import {INCOME, EXPENSE} from '../../common/constants/Constants';

type SignupProps = NativeStackScreenProps<AppStackParamList, 'Signup'>;

const Signup: FC<SignupProps> = ({navigation}: SignupProps) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onSignupPress = () => {};

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
