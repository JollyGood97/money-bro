import React, {FC} from 'react';
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Center,
  useColorModeValue,
  View,
} from 'native-base';

import {INCOME} from '../../../constants/Constants';
import Transaction from '../../../model/Transaction';
import isEmpty from 'lodash/isEmpty';
import MonthlyData from '../../../model/MonthlyData';
import NoDataMessage from '../../../common/NoDataMessage';

type SummaryListProps = {
  data: MonthlyData[];
  type: 'Income' | 'Expense';
  getTotalPerMonth: Function;
  userCurrency: string;
};

const SummaryList: FC<SummaryListProps> = (props: SummaryListProps) => {
  const {data, type, userCurrency} = props;

  const getTotalPerMonth = (dataForMonth: Transaction[]): number => {
    let total = 0;

    dataForMonth.forEach(transaction => {
      total = total + parseInt(transaction.amount, 10);
    });
    return total;
  };

  return (
    <View flex={1} bg={useColorModeValue('#f5f5f4', '#000e21')}>
      <Center>
        <Heading fontSize="xl" marginTop={4}>
          {type === INCOME ? 'Income' : 'Expenses'}
        </Heading>
      </Center>
      {isEmpty(data) && (
        <Box paddingLeft={5} paddingRight={5}>
          <NoDataMessage description="No data. Start adding to view the summary." />
        </Box>
      )}
      <FlatList
        data={data}
        renderItem={({item}) =>
          !isEmpty(item) ? (
            <Box>
              <Heading marginTop={5} fontSize="lg" p="4" pb="3">
                {item.month}
              </Heading>
              {item.data.map((transaction, key) => (
                <Box
                  key={key}
                  bg={'white'}
                  rounded={3}
                  borderBottomWidth="1"
                  borderColor="warmGray.300"
                  p={2}
                  marginLeft={5}
                  marginRight={5}>
                  <HStack>
                    <Text color="coolGray.800" bold>
                      {transaction.description}
                    </Text>

                    <Spacer />

                    <Text fontSize="16px" bold color="indigo.900">
                      {userCurrency} {transaction.amount}
                    </Text>
                  </HStack>
                </Box>
              ))}
              <HStack
                p={2}
                rounded={3}
                mb={2}
                bgColor={'blue.200'}
                marginRight={5}
                marginLeft={5}>
                <Text color="coolGray.800" bold>
                  Total
                </Text>
                <Spacer />
                <Text fontSize="16px" bold color="indigo.900">
                  {userCurrency} {getTotalPerMonth(item.data)?.toString()}
                </Text>
              </HStack>
            </Box>
          ) : (
            <></>
          )
        }
        keyExtractor={item => item.month}
      />
    </View>
  );
};

export default SummaryList;
