import React, {FC, useState} from 'react';

import {
  InputGroup,
  InputRightAddon,
  Button,
  Input,
  Modal,
  FormControl,
  Text,
  Radio,
  Select,
  CheckIcon,
  Checkbox,
  Spacer,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

import {useAddFixedDepositMutation} from '../../../api/baseApi';
import {getFormattedDate} from '../../../utils/CommonUtils';

// import {useAddIncomeExpenseMutation} from '../../api/baseApi';
// import {INCOME, EXPENSE} from '../../common/constants/Constants';

type AddFDModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  userID: string;
};

const AddFDModal: FC<AddFDModalProps> = (props: AddFDModalProps) => {
  const {showModal, setShowModal, userID} = props;
  const [addFixedDeposit, {isLoading, isSuccess, isError}] =
    useAddFixedDepositMutation();
  const [bank, setbank] = useState<string>('');
  const [deposit, setDeposit] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('Monthly');
  const [period, setPeriod] = useState<string>('1');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [calculationEnabled, setCalculationEnabled] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // const {toggleColorMode} = useColorMode();
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // danger.200 for light mode.

  //   setDate = (event, date) => {};

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content width="90%">
        <Modal.CloseButton />
        <Modal.Header bgColor={'success.200'}>
          <Text>Add Fixed Deposit</Text>
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Bank</FormControl.Label>
            <Input onChangeText={text => setbank(text.trim())} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Initial Deposit</FormControl.Label>
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
                onChangeText={val => setDeposit(val)}
              />
              <InputRightAddon children={'$'} />
            </InputGroup>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>
              Date of Deposit
              <Spacer />
              <Button
                onPress={() => {
                  setShowDatePicker(true);
                }}>
                Set Date
              </Button>
            </FormControl.Label>
            <Text marginTop={-5} fontWeight={'bold'}>
              {getFormattedDate(startDate)}
            </Text>
            {showDatePicker && (
              <DateTimePicker
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  date && setStartDate(date);
                }}
                value={startDate}
              />
            )}
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Interest Rate</FormControl.Label>
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
                placeholder="rate"
                keyboardType="numeric"
                onChangeText={val => setRate(val)}
              />
              <InputRightAddon children={'%'} />
            </InputGroup>
          </FormControl>

          <FormControl mt="3">
            <FormControl.Label>Payment Mode</FormControl.Label>
            <Radio.Group
              name="paymentMode"
              accessibilityLabel="payment mode"
              value={paymentMode}
              onChange={value => {
                setPaymentMode(value);
              }}>
              <Radio value="Monthly" my={1}>
                Monthly
              </Radio>
              <Radio value="Maturity" my={1}>
                Maturity
              </Radio>
            </Radio.Group>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Deposit Period (Months)</FormControl.Label>
            <Select
              selectedValue={period}
              minWidth="200"
              accessibilityLabel="Choose deposit period"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={value => setPeriod(value)}>
              <Select.Item label="1" value="1" />
              <Select.Item label="2" value="2" />
              <Select.Item label="3" value="3" />
              <Select.Item label="6" value="6" />
              <Select.Item label="9" value="9" />
              <Select.Item label="12" value="12" />
              <Select.Item label="18" value="18" />
              <Select.Item label="24" value="24" />
              <Select.Item label="36" value="36" />
              <Select.Item label="48" value="48" />
              <Select.Item label="60" value="60" />
            </Select>
          </FormControl>
          <Checkbox
            isChecked={calculationEnabled}
            colorScheme="info"
            value="calculationEnabled"
            onChange={isEnabled => {
              setCalculationEnabled(isEnabled);
            }}>
            Auto Calculate
          </Checkbox>
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
              onPress={() => {
                console.log('modal', userID);
                addFixedDeposit({
                  bank,
                  deposit,
                  rate,
                  paymentMode,
                  period,
                  startDate,
                  calculationEnabled,
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

export default AddFDModal;

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