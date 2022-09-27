import React, {FC, useState} from 'react';
import {Input, FormControl, Text} from 'native-base';
import {useNetInfo, NetInfoState} from '@react-native-community/netinfo';

import Modal from '../common/Modal';
import NumericInput from './NumericInput';

import {useAddIncomeExpenseMutation} from '../api/baseApi';

type AddIncomeExpenseModalProps = {
  type: 'Income' | 'Expense';
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  userID: string;
  currentMonth: number;
  setShowAlert: (value: boolean) => void;
  setAlertMessage: Function;
};

const AddIncomeExpenseModal: FC<AddIncomeExpenseModalProps> = (
  props: AddIncomeExpenseModalProps,
) => {
  const {
    type,
    showModal,
    setShowModal,
    userID,
    currentMonth,
    setShowAlert,
    setAlertMessage,
  } = props;
  const [addIncomeExpense, {isLoading, isSuccess, isError}] =
    useAddIncomeExpenseMutation();
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
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
          'No Internet connection. Your added data will be synced when back online.',
      });
      // set alert in parent to true setShowAlert(true); setAlert(type: 'warning', message: 'No Internet connection');
    }
    try {
      console.log('inside try');
      await addIncomeExpense({
        type,
        description,
        amount,
        month: currentMonth,
        uid: userID,
      }).then(() => {
        setShowModal(false);
      });
    } catch (error) {}
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading={`Add ${type}`}
      onSave={onSave}
      isLoading={isLoading}>
      <FormControl>
        <FormControl.Label>
          <Text fontWeight="bold">Description</Text>
        </FormControl.Label>
        <Input onChangeText={(text: any) => setDescription(text.trim())} />
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>
          <Text fontWeight="bold"> Amount</Text>
        </FormControl.Label>
        <NumericInput onChange={val => setAmount(val)} />
      </FormControl>
    </Modal>
  );
};

export default AddIncomeExpenseModal;
