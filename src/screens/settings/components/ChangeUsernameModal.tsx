import React, {FC, useState} from 'react';
import {Input, FormControl, Text} from 'native-base';
import {useNetInfo, NetInfoState} from '@react-native-community/netinfo';

import Modal from '../../../common/Modal';

import {useChangeCurrencyMutation} from '../../../api/BaseApi';
import isEmpty from 'lodash/isEmpty';

type ChangeCurrencyModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  userID: string;
  currentCurrency: string;
  setShowAlert: (value: boolean) => void;
  setAlertMessage: Function;
};

const ChangeCurrencyModal: FC<ChangeCurrencyModalProps> = (
  props: ChangeCurrencyModalProps,
) => {
  const {
    showModal,
    setShowModal,
    userID,
    currentCurrency,
    setShowAlert,
    setAlertMessage,
  } = props;
  const [changeCurrency, {isLoading}] = useChangeCurrencyMutation();
  const [currency, setCurrency] = useState<string>(currentCurrency);
  // const {toggleColorMode} = useColorMode();
  // danger.200 for light mode.
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
      await changeCurrency({
        currency,
        uid: userID,
      }).then(() => {
        setShowModal(true);
        setAlertMessage({
          alertType: 'success',
          message:
            'Successfully changed currency. It will be updated on app restart.',
        });
      });
    } catch (error) {
      setShowModal(true);
      setAlertMessage({
        alertType: 'error',
        message: 'Failed to change currency.',
      });
    }
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading="Change Currency"
      onSave={onSave}
      disableSave={isEmpty(currency)}
      isLoading={isLoading}>
      <FormControl>
        <FormControl.Label>
          <Text fontWeight="bold">Enter new currency symbol:</Text>
        </FormControl.Label>
        <Input onChangeText={(text: any) => setCurrency(text.trim())} />
      </FormControl>
    </Modal>
  );
};

export default ChangeCurrencyModal;
