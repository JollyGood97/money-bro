import React, {FC, useState} from 'react';

import {
  InputGroup,
  InputRightAddon,
  Button,
  Input,
  Modal,
  FormControl,
  Text,
} from 'native-base';
import {useAddIncomeExpenseMutation} from '../../api/baseApi';
// import {INCOME, EXPENSE} from '../../common/constants/Constants';

type AddIncomeExpenseModalProps = {
  type: 'Income' | 'Expense';
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  currentMonth: string;
  userID: string;
};

const AddIncomeExpenseModal: FC<AddIncomeExpenseModalProps> = (
  props: AddIncomeExpenseModalProps,
) => {
  const {type, showModal, setShowModal, currentMonth, userID} = props;
  const [addIncomeExpense, {isLoading, isSuccess, isError}] =
    useAddIncomeExpenseMutation();
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  // const {toggleColorMode} = useColorMode();
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // danger.200 for light mode.
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header bgColor={'success.200'}>
          <Text>Add {type}</Text>
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Input onChangeText={text => setDescription(text.trim())} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Amount</FormControl.Label>
            <InputGroup
              w={{
                base: '70%',
                md: '285',
              }}>
              <Input
                w={{
                  base: '70%',
                  md: '100%',
                }}
                placeholder="amount"
                keyboardType="numeric"
                onChangeText={val => setAmount(val)}
              />
              <InputRightAddon children={'$'} />
            </InputGroup>
          </FormControl>
        </Modal.Body>
        <Modal.Footer bgColor={'success.200'}>
          <Button.Group space={2}>
            <Button
              w={{
                base: '50%',
                md: '100%',
              }}
              variant="outline"
              colorScheme="indigo"
              onPress={() => {
                setShowModal(false);
              }}>
              Cancel
            </Button>
            <Button
              w={{
                base: '50%',
                md: '100%',
              }}
              colorScheme="indigo"
              onPress={async () => {
                console.log('modal', userID);
                await addIncomeExpense({
                  type,
                  description,
                  amount,
                  month: new Date().getMonth(),
                  uid: userID,
                }).then(() => {
                  setShowModal(false);
                });
                // close after saving
              }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddIncomeExpenseModal;

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
