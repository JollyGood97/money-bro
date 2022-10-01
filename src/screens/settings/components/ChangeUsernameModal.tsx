import React, {FC, useContext, useState} from 'react';
import {Input, FormControl, Text} from 'native-base';
import {useNetInfo, NetInfoState} from '@react-native-community/netinfo';

import Modal from '../../../common/Modal';

import {useChangeUsernameMutation} from '../../../api/BaseApi';
import isEmpty from 'lodash/isEmpty';
import {UserContext} from '../../../context/UserContext';
import User from '../../../model/User';

type ChangeCurrencyModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  userID: string;
  currentUsername: string;
  setShowAlert: (value: boolean) => void;
  setAlertMessage: Function;
};

const ChangeCurrencyModal: FC<ChangeCurrencyModalProps> = (
  props: ChangeCurrencyModalProps,
) => {
  const userContext = useContext(UserContext);

  const {
    showModal,
    setShowModal,
    userID,
    currentUsername,
    setShowAlert,
    setAlertMessage,
  } = props;
  const [changeUsername, {isLoading}] = useChangeUsernameMutation();
  const [username, setUsername] = useState<string>(currentUsername);

  const internetState: NetInfoState = useNetInfo();

  const onSave = async () => {
    if (!internetState.isConnected) {
      setShowModal(false);
      setShowAlert(true);
      setAlertMessage({
        alertType: 'warning',
        message:
          'No Internet connection. Your change will automatically happen when back online.',
      });
    }
    try {
      await changeUsername({
        username,
        uid: userID,
      }).then(() => {
        userContext?.setUser({
          ...(userContext?.user as User),
          username,
        });
        setShowAlert(true);
        setShowModal(false);
        setAlertMessage({
          alertType: 'success',
          message: 'Successfully changed username.',
        });
      });
    } catch (error) {
      setShowAlert(true);
      setShowModal(false);
      setAlertMessage({
        alertType: 'error',
        message: 'Failed to change username.',
      });
    }
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading="Change Username"
      onSave={onSave}
      disableSave={isEmpty(username)}
      isLoading={isLoading}>
      <FormControl>
        <FormControl.Label>
          <Text fontWeight="bold">Enter new username:</Text>
        </FormControl.Label>
        <Input onChangeText={(text: any) => setUsername(text.trim())} />
      </FormControl>
    </Modal>
  );
};

export default ChangeCurrencyModal;
