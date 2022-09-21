import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
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

type AuthProps = {
  setAuthenticated: Function;
};

const Auth: FC<AuthProps> = (props: AuthProps) => {
  const [newBiometryType, setBiometryType] = useState<string | null>(null);

  const {setAuthenticated} = props;

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then(biometryType => {
        setBiometryType(biometryType);
      })
      .catch(error => console.log('isSensorAvailable error => ', error));
  }, []);

  const showAuthenticationDialog = () => {
    if (newBiometryType !== null && newBiometryType !== undefined) {
      FingerprintScanner.authenticate({
        description: 'Please scan',
      })
        .then(() => {
          setAuthenticated(true);
          console.log('Logged in!');
          //you can write your logic here to what will happen on successful authentication
        })
        .catch(error => {
          console.log('Authentication error is => ', error);
        });
    } else {
      console.log('biometric authentication is not available');
    }
  };

  return (
    <Center>
      <Button onPress={showAuthenticationDialog}>
        <Text>Authenticate</Text>
      </Button>
      <Text>{`biometryType is  ${newBiometryType}`}</Text>
    </Center>
  );
};

export default Auth;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonStyle: {
//     width: '70%',
//     borderRadius: 25,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {color: '#fff', fontSize: 17, fontWeight: 'bold'},
//   biometryText: {
//     color: '#000',
//     fontSize: 17,
//     fontWeight: 'bold',
//     marginTop: 30,
//   },
// });
