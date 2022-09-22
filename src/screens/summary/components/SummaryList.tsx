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
  console.log(data);

  return (
    <Box>
      <Center>
        <Heading fontSize="xl" p="4" pb="3">
          {type === INCOME ? 'Income' : 'Expenses'}
        </Heading>
      </Center>

      {month.map((monthInText, key: number) => {
        const dataForMonth = data.filter(
          monthlyData => monthlyData.month === key,
        );
        if (!isEmpty(dataForMonth)) {
          return (
            <>
              <Heading fontSize="lg" p="4" pb="3" key={key}>
                {monthInText}
              </Heading>

              <FlatList
                data={dataForMonth}
                renderItem={({item}) => (
                  <Box
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'muted.50',
                    }}
                    borderColor="muted.800"
                    m={5}
                    pl={['0', '4']}
                    pr={['0', '5']}
                    py="2">
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
                        fontSize="14px"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        // alignSelf="flex-start"
                      >
                        $ {item.amount}
                      </Text>
                    </HStack>
                  </Box>
                )}
                keyExtractor={item => item.id}
              />
            </>
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
