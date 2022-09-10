import React, {FC, useEffect, useState} from 'react';
import {Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={showAuthenticationDialog}>
        <Text>Authenticate</Text>
      </TouchableOpacity>
      <Text
        style={
          styles.biometryText
        }>{`biometryType is  ${newBiometryType}`}</Text>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '70%',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 17, fontWeight: 'bold'},
  biometryText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 30,
  },
});
