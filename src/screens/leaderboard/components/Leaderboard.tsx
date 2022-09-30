import React, {FC, useContext, useState, useEffect, useCallback} from 'react';
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  VStack,
  Spacer,
  Center,
  Menu,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  useGetAllUsersQuery,
  useGetAllUsersIncomeExpenseQuery,
} from '../../../api/baseApi';
import {UserContext} from '../../../context/UserContext';
import {
  EXPENSE,
  INCOME,
  MenuOptions,
  month,
} from '../../../constants/Constants';
import Transaction from '../../../model/Transaction';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import {getCurrentMonth, getTotal} from '../../../utils/CommonUtils';
import LeaderboardData from '../../../model/LeaderboardData';

type LeaderboardProps = {
  type: string;
};
const Leaderboard: FC<LeaderboardProps> = (props: LeaderboardProps) => {
  const {type} = props;
  // const data: Transaction[] = props.route.params.data || [];
  const userContext = useContext(UserContext);

  const userID = userContext?.user?.uid || '';

  const {isLoading: isLoadingUsers, data: allUsers = []} =
    useGetAllUsersQuery('');

  const {isLoading: isLoadingIEData, data: allUsersIEData = []} =
    useGetAllUsersIncomeExpenseQuery('');

  console.log('users', allUsers);
  const [selectedOption, setSelectedOption] = useState<string>(MenuOptions[0]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);

  const setData = useCallback(() => {
    const allUserScores = allUsers.map(user => {
      let userIEData = allUsersIEData.filter(data => data.uid === user.uid);
      if (type === 'Monthly') {
        userIEData = userIEData.filter(
          data => data.month === getCurrentMonth(),
        );
      }
      const userIncomeData = userIEData.filter(data => data.type === INCOME);
      const userExpenseData = userIEData.filter(data => data.type === EXPENSE);

      const totalIncome = getTotal(userIncomeData);
      const totalExpense = getTotal(userExpenseData);
      const totalSavings = totalIncome - totalExpense;

      return {
        uid: user.uid,
        username: user.username || '',
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        totalSavings: totalSavings,
      };
    });
    setLeaderboardData(orderBy(allUserScores, ['totalSavings'], ['desc']));
  }, [allUsers, allUsersIEData, type]);

  useEffect(() => {
    // no dta msg
    if (!isLoadingUsers && !isLoadingIEData && !isEmpty(allUsersIEData)) {
      setData();
      return () => setData();
    }
  }, [allUsers, allUsersIEData, isLoadingIEData, isLoadingUsers, setData]);

  const onMenuItemSelect = (item: string) => {
    if (item === MenuOptions[0]) {
      setLeaderboardData(orderBy(leaderboardData, ['totalSavings'], ['desc']));
    }
    if (item === MenuOptions[1]) {
      setLeaderboardData(orderBy(leaderboardData, ['totalIncome'], ['desc']));
    }
    if (item === MenuOptions[2]) {
      setLeaderboardData(orderBy(leaderboardData, ['totalExpense'], ['desc']));
    }
    setSelectedOption(item);
  };

  const getResult = (item: LeaderboardData) => {
    if (selectedOption === MenuOptions[0]) {
      return item.totalSavings;
    }
    if (selectedOption === MenuOptions[1]) {
      return item.totalIncome;
    }
    if (selectedOption === MenuOptions[2]) {
      return item.totalExpense;
    }
  };
  console.log('leaderboardData', leaderboardData);

  // insert down icon
  const colorMain =
    selectedOption === MenuOptions[0]
      ? 'blue.600'
      : selectedOption === MenuOptions[1]
      ? 'indigo.900'
      : 'yellow.400';
  const colorBg =
    selectedOption === MenuOptions[0]
      ? 'blue.200'
      : selectedOption === MenuOptions[1]
      ? 'indigo.200'
      : 'yellow.200';
  return (
    <Box p={6}>
      <HStack space={5} marginBottom={6} marginLeft={-2}>
        <Heading fontSize="xl" p="4" pb="3">
          {selectedOption}
        </Heading>
        <Menu
          w="160"
          trigger={triggerProps => {
            return (
              <Button colorScheme="indigo" {...triggerProps}>
                <HStack space={4}>
                  <Text color="white" bold>
                    Category
                  </Text>
                  <Box marginTop={1}>
                    <Icon
                      name="arrow-down-drop-circle"
                      size={16}
                      color="white"
                    />
                  </Box>
                </HStack>
              </Button>
            );
          }}>
          {MenuOptions.map((item, key) => (
            <Menu.Item key={key} onPress={() => onMenuItemSelect(item)}>
              {item}
            </Menu.Item>
          ))}
        </Menu>
      </HStack>
      <FlatList
        data={leaderboardData}
        renderItem={({item, index}) => (
          <Box
            width={'100%'}
            bg={colorBg}
            rounded="lg"
            borderWidth={2}
            borderColor={colorMain}
            p={3}>
            <HStack space={4}>
              <Text color="black" bold>
                # {index + 1}
              </Text>
              <Text color="black" bold>
                {item.username}
              </Text>
              <Spacer />
              <Text fontSize="16px" bold color="black">
                $ {getResult(item)}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.uid}
      />
    </Box>
  );
};

export default Leaderboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// {month.map((monthInText, key: number) => {
//     const dataForMonth = data.filter(
//       monthlyData => monthlyData.month === key,
//     );
//     if (!isEmpty(dataForMonth)) {
//       return (
//         <Box key={key}>
//           <Heading fontSize="lg" p="4" pb="3">
//             {monthInText}
//           </Heading>

//           <FlatList
//             data={dataForMonth}
//             renderItem={({item}) => (
//               <Box
//                 borderBottomWidth="1"
//                 _dark={{
//                   borderColor: 'muted.50',
//                 }}
//                 borderColor="muted.800"
//                 m={5}
//                 pl={['0', '4']}
//                 pr={['0', '5']}
//                 py="2">
//                 <HStack>
//                   <Text
//                     _dark={{
//                       color: 'warmGray.50',
//                     }}
//                     color="coolGray.800"
//                     bold>
//                     {item.description}
//                   </Text>
//                   {/* <Text color="coolGray.600" _dark={{
//             color: "warmGray.200"
//           }}>
//                   {item.recentText}
//                 </Text> */}

//                   <Spacer />
//                   <Text
//                     fontSize="14px"
//                     _dark={{
//                       color: 'warmGray.50',
//                     }}
//                     color="coolGray.800"
//                     // alignSelf="flex-start"
//                   >
//                     $ {item.amount}
//                   </Text>
//                 </HStack>
//               </Box>
//             )}
//             keyExtractor={item => item.id}
//           />
//         </Box>
//       );
//     } else {
//       return <></>;
//     }
//   })}
