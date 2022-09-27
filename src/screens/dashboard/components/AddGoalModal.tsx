import React, {FC, useState} from 'react';

import {Input, FormControl, Text} from 'native-base';
import {useAddMonthlyGoalMutation} from '../../../api/baseApi';
import Modal from '../../../common/Modal';
import NumericInput from '../../../common/NumericInput';

type AddGoalModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  currentMonth: number;
  userID: string;
  currentMonthInText: string;
};

const AddGoalModal: FC<AddGoalModalProps> = (props: AddGoalModalProps) => {
  const {showModal, setShowModal, currentMonth, userID, currentMonthInText} =
    props;
  const [addMonthlyGoal, {isLoading, isSuccess, isError}] =
    useAddMonthlyGoalMutation();
  const [goal, setGoal] = useState<string>('');
  // const {toggleColorMode} = useColorMode();
  // danger.200 for light mode.

  const onSave = async () => {
    try {
      await addMonthlyGoal({
        goal,
        month: currentMonth,
        uid: userID,
      }).then(() => {
        setShowModal(false);
      });
    } catch (error) {
      console.log('error adding', error);
      setShowModal(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading={`Goal for ${currentMonthInText}`}
      onSave={onSave}
      isLoading={isLoading}>
      <FormControl mt="3">
        <FormControl.Label>
          <Text fontWeight="bold">
            What is your target balance amount for this month?
          </Text>
        </FormControl.Label>
        <NumericInput onChange={val => setGoal(val)} />
      </FormControl>
    </Modal>
  );
};

export default AddGoalModal;
