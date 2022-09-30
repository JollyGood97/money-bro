import React, {FC, useContext, useState, useEffect, useCallback} from 'react';
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Menu,
  Button,
  VStack,
  Spinner,
  useColorModeValue,
  View,
} from 'native-base';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  useGetAllUsersQuery,
  useGetAllUsersIncomeExpenseQuery,
} from '../../../api/BaseApi';
import {UserContext} from '../../../context/UserContext';
import {
  EXPENSE,
  INCOME,
  MenuOptions,
  month,
} from '../../../constants/Constants';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import {getCurrentMonth, getTotal} from '../../../utils/CommonUtils';
import LeaderboardData from '../../../model/LeaderboardData';

type LeaderboardProps = {
  type: string;
};
const Leaderboard: FC<LeaderboardProps> = (props: LeaderboardProps) => {
  const {type} = props;

  const userContext = useContext(UserContext);
  const userID = userContext?.user?.uid || '';

  const {isLoading: isLoadingUsers, data: allUsers = []} =
    useGetAllUsersQuery('');

  const {isLoading: isLoadingIEData, data: allUsersIEData = []} =
    useGetAllUsersIncomeExpenseQuery('');

  const [selectedOption, setSelectedOption] = useState<string>(MenuOptions[0]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);

  const setData = useCallback(() => {
    const allUserScores = allUsers
      .filter(user => user.leaderboardEnabled)
      .map(user => {
        let userIEData = allUsersIEData.filter(data => data.uid === user.uid);
        if (type === 'Monthly') {
          userIEData = userIEData.filter(
            data => data.month === getCurrentMonth(),
          );
        }
        const userIncomeData = userIEData.filter(data => data.type === INCOME);
        const userExpenseData = userIEData.filter(
          data => data.type === EXPENSE,
        );

        const totalIncome = getTotal(userIncomeData);
        const totalExpense = getTotal(userExpenseData);
        const total = totalIncome + totalExpense;

        const totalSavings = totalIncome - totalExpense;

        return {
          uid: user.uid,
          username: user.username || '',
          totalIncome: (totalIncome / total) * 100 || 0,
          totalExpense: (totalExpense / total) * 100 || 0,
          totalSavings: (totalSavings / total) * 100 || 0,
        };
      });
    setLeaderboardData(orderBy(allUserScores, ['totalSavings'], ['desc']));
  }, [allUsers, allUsersIEData, type]);

  useEffect(() => {
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
    <View height="100%" bg={useColorModeValue('#f5f5f4', '#000e21')}>
      {isLoadingUsers || isLoadingIEData ? (
        <VStack marginTop={20} space={10} alignItems="center">
          <Spinner color="indigo.500" size="lg" />
          <Text>Please wait, loading data ...</Text>
        </VStack>
      ) : (
        <Box p={6}>
          <HStack space={5} marginBottom={6} marginLeft={-2}>
            <VStack marginTop={-2}>
              <Heading fontSize="xl" p="4" pb="3">
                {selectedOption}
              </Heading>
              {type === 'Monthly' && (
                <Text bold fontSize="md" marginLeft={4}>
                  {month[getCurrentMonth()]}
                </Text>
              )}
            </VStack>
            <VStack>
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
            </VStack>
          </HStack>

          <FlatList
            data={leaderboardData}
            renderItem={({item, index}) => (
              <Box
                width={'100%'}
                bg={userID === item.uid ? 'primary.100' : colorBg}
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
                    {/* {userID === item.uid ? item.username : 'Anonymous user'} */}
                  </Text>
                  <Spacer />
                  <Text fontSize="16px" bold color="black">
                    {getResult(item)?.toFixed(2)} %
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={item => item.uid}
          />
        </Box>
      )}
    </View>
  );
};

export default Leaderboard;
