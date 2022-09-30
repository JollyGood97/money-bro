import React, {FC} from 'react';
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Center,
} from 'native-base';
import {INCOME} from '../../../constants/Constants';
import Transaction from '../../../model/Transaction';
import isEmpty from 'lodash/isEmpty';
import MonthlyData from '../../../model/MonthlyData';

type SummaryListProps = {
  data: MonthlyData[];
  type: 'Income' | 'Expense';
  getTotalPerMonth: Function;
};

const SummaryList: FC<SummaryListProps> = (props: SummaryListProps) => {
  const {data, type} = props;

  const getTotalPerMonth = (dataForMonth: Transaction[]): number => {
    let total = 0;

    dataForMonth.forEach(transaction => {
      total = total + parseInt(transaction.amount, 10);
    });
    return total;
  };

  return (
    <Box>
      <Center>
        <Heading fontSize="xl" marginTop={5}>
          {type === INCOME ? 'Income' : 'Expenses'}
        </Heading>
      </Center>

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
                    _dark={{
                      borderColor: 'muted.50',
                    }}
                    borderColor="warmGray.300"
                    p={2}
                    marginLeft={5}
                    marginRight={5}>
                    <HStack>
                      <Text
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        bold>
                        {item.description}
                      </Text>

                      <Spacer />

                      <Text
                        fontSize="16px"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        bold
                        color="indigo.900">
                        $ {item.amount}
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
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  Total
                </Text>
                <Spacer />
                <Text
                  fontSize="16px"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  bold
                  color="indigo.900">
                  $ {getTotalPerMonth(monthlyData.data)?.toString()}
                </Text>
              </HStack>
            </Box>
          );
        } else {
          return <></>;
        }
      })}
    </Box>
  );
};

export default SummaryList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
