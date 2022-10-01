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
    <View height="100%" bg={useColorModeValue('#f5f5f4', '#000e21')}>
      <Box>
        <Center>
          <Heading fontSize="xl" marginTop={5}>
            {type === INCOME ? 'Income' : 'Expenses'}
          </Heading>
        </Center>
        {isEmpty(data) && (
          <Box paddingLeft={5} paddingRight={5}>
            <NoDataMessage description="No data. Start adding to view the summary." />
          </Box>
        )}

        {data.map((monthlyData, key: number) => {
          if (!isEmpty(monthlyData)) {
            return (
              <Box key={key}>
                <Heading marginTop={5} fontSize="lg" p="4" pb="3" key={key}>
                  {monthlyData.month}
                </Heading>

                <FlatList
                  data={monthlyData.data}
                  renderItem={({item}) => (
                    <Box
                      bg={'white'}
                      rounded="lg"
                      borderBottomWidth="1"
                      borderColor="warmGray.300"
                      p={2}
                      marginLeft={5}
                      marginRight={5}>
                      <HStack>
                        <Text color="coolGray.800" bold>
                          {item.description}
                        </Text>

                        <Spacer />

                        <Text fontSize="16px" bold color="indigo.900">
                          {userCurrency} {item.amount}
                        </Text>
                      </HStack>
                    </Box>
                  )}
                  keyExtractor={item => item.id}
                />

                <HStack
                  p={2}
                  rounded={'lg'}
                  bgColor={'blue.200'}
                  marginRight={5}
                  marginLeft={5}>
                  <Text color="coolGray.800" bold>
                    Total
                  </Text>
                  <Spacer />
                  <Text fontSize="16px" bold color="indigo.900">
                    {userCurrency}{' '}
                    {getTotalPerMonth(monthlyData.data)?.toString()}
                  </Text>
                </HStack>
              </Box>
            );
          } else {
            return <></>;
          }
        })}
      </Box>
    </View>
  );
};

export default SummaryList;
