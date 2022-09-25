import React, {FC} from 'react';
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  VStack,
  Spacer,
  Center,
} from 'native-base';
import {EXPENSE, INCOME, month} from '../../../constants/Constants';
import Transaction from '../../../model/Transaction';
import isEmpty from 'lodash/isEmpty';

type SummaryListProps = {
  data: Transaction[];
  type: 'Income' | 'Expense';
};

const SummaryList: FC<SummaryListProps> = (props: SummaryListProps) => {
  // const data: Transaction[] = props.route.params.data || [];
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

      {month.map((monthInText, key: number) => {
        const dataForMonth = data.filter(
          monthlyData => monthlyData.month === key,
        );
        if (!isEmpty(dataForMonth)) {
          return (
            <Box key={key}>
              <Heading marginTop={5} fontSize="lg" p="4" pb="3" key={key}>
                {monthInText}
              </Heading>

              <FlatList
                data={dataForMonth}
                renderItem={({item}) => (
                  <Box
                    bg={'white'}
                    // borderBottomLeftRadius={5}
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
                      {/* <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                      {item.recentText}
                    </Text> */}

                      <Spacer />

                      <Text
                        fontSize="16px"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        bold
                        color="indigo.900"
                        // alignSelf="flex-start"
                      >
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
                  color="indigo.900"
                  // alignSelf="flex-start"
                >
                  $ {getTotalPerMonth(dataForMonth)?.toString()}
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
