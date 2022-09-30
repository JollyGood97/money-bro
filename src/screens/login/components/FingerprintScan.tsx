import React, {FC, useEffect, useState} from 'react';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {Text, Center, Icon, Pressable} from 'native-base';
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
      console.log('Biometric authentication is not available');
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
