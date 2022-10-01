import React, {FC} from 'react';

import {
  Box,
  Center,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  View,
} from 'native-base';
import NoDataMessage from '../../../common/NoDataMessage';

type PanelProps = {
  heading: string;
  amount: number;
  color: string;
  userCurrency: string;
};

const Panel: FC<PanelProps> = (props: PanelProps) => {
  const {heading, amount, color, userCurrency} = props;
  return (
    <Box
      bg="white"
      shadow={3}
      rounded="lg"
      borderWidth="2"
      borderColor={color}
      p={2}
      marginLeft={5}
      marginRight={5}>
      <Center p={4}>
        <HStack space={3} m={2}>
          <Text
            fontSize={16}
            bold
            _dark={{
              color: 'black',
            }}>
            {heading}
          </Text>
        </HStack>

        <Text color={color} bold fontSize={42}>
          {userCurrency} {amount}
        </Text>
      </Center>
    </Box>
  );
};

type OverallSummaryProps = {
  overallIncome: number;
  overallExpense: number;
  userCurrency: string;
};

const OverallSummary: FC<OverallSummaryProps> = (
  props: OverallSummaryProps,
) => {
  const {overallIncome, overallExpense, userCurrency} = props;

  return (
    <View height="100%" bg={useColorModeValue('#f5f5f4', '#000e21')}>
      {overallIncome === 0 && overallExpense === 0 && (
        <Box paddingLeft={5} paddingRight={5}>
          <NoDataMessage
            description={
              'No income or expense data. Start adding to view the summary.'
            }
          />
        </Box>
      )}
      <Box paddingTop={6}>
        <VStack space={10}>
          <Panel
            heading="Overall Income"
            amount={overallIncome}
            color="indigo.800"
            userCurrency={userCurrency}
          />
          <Panel
            heading="Overall Expense"
            amount={overallExpense}
            color="yellow.400"
            userCurrency={userCurrency}
          />
          <Panel
            heading=" Total Savings"
            amount={overallIncome - overallExpense}
            color="info.400"
            userCurrency={userCurrency}
          />
        </VStack>
      </Box>
    </View>
  );
};

export default OverallSummary;
