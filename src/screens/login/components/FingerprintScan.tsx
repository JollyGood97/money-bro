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
  Image,
  Icon,
  Pressable,
} from 'native-base';
// @ts-ignore
import FingerprintIcon from '../../../assets/fingerprint.svg';

type FingerprintScanProps = {
  setAuthenticated: Function;
  setIsAuthenticating: Function;
};

const FingerprintScan: FC<FingerprintScanProps> = (
  props: FingerprintScanProps,
) => {
  const [newBiometryType, setBiometryType] = useState<string | null>(null);

  const {setAuthenticated, setIsAuthenticating} = props;

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
          setIsAuthenticating(true);
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
      <Pressable onPress={showAuthenticationDialog}>
        <Icon
          as={<FingerprintIcon />}
          name="android1"
          _dark={{
            color: 'white',
          }}
          size="120"
        />
      </Pressable>
      <Text>Touch</Text>
    </Center>
  );
};

export default FingerprintScan;

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
