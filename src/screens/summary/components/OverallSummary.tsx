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

type PanelProps = {
  heading: string;
  amount: number;
  color: string;
};

const Panel: FC<PanelProps> = (props: PanelProps) => {
  const {heading, amount, color} = props;
  return (
    <Box
      bg="white"
      shadow={3}
      rounded="lg"
      borderWidth="2"
      _dark={{
        borderColor: 'muted.50',
      }}
      borderColor={color}
      p={2}
      marginLeft={5}
      marginRight={5}>
      <Center p={4}>
        <HStack space={3} m={2}>
          <Text fontSize={16} bold>
            {heading}
          </Text>
        </HStack>

        <Text color={color} bold fontSize={42}>
          $ {amount}
        </Text>
      </Center>
    </Box>
  );
};

type OverallSummaryProps = {
  overallIncome: number;
  overallExpense: number;
};

const OverallSummary: FC<OverallSummaryProps> = (
  props: OverallSummaryProps,
) => {
  const {overallIncome, overallExpense} = props;

  return (
    <View height="100%" bg={useColorModeValue('#f5f5f4', '#000e21')}>
      <Box paddingTop={6}>
        <VStack space={10}>
          <Panel
            heading=" Overall Income"
            amount={overallIncome}
            color="indigo.800"
          />
          <Panel
            heading=" Overall Expense"
            amount={overallExpense}
            color="yellow.400"
          />
          <Panel
            heading=" Total Savings"
            amount={overallIncome - overallExpense}
            color="info.400"
          />
        </VStack>
      </Box>
    </View>
  );
};

export default OverallSummary;
