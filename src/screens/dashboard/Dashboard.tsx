import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {
  HStack,
  Center,
  View,
  Text,
  Button,
  useColorModeValue,
  useColorMode,
  Box,
  Heading,
  Pressable,
} from 'native-base';
import isEmpty from 'lodash/isEmpty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddIncomeExpenseModal from '../../common/AddIncomeExpenseModal';
import AddGoalModal from './components/AddGoalModal';

import {EXPENSE, INCOME, month} from '../../constants/Constants';
import {UserContext} from '../../context/UserContext';
import {
  useGetIncomeExpenseQuery,
  useGetMonthlyGoalQuery,
} from '../../api/baseApi';
import {getCurrentMonth} from '../../utils/CommonUtils';
import AlertNotice from '../../common/Alert';

// move to const file
const widthAndHeight = 250;
// const series = [50, 50]; // need to calculate
const sliceColor = ['#facc15', '#4f46e5'];

type AlertMsg = {
  message: string;
  alertType: 'error' | 'success' | 'warning' | 'info';
};
type DashboardProps = {};

const Dashboard: FC<DashboardProps> = (props: DashboardProps) => {
  const {} = props;
  const {colorMode} = useColorMode();
  const [showAddIncomeModal, setShowAddIncomeModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMsg>({} as AlertMsg);
  const [balance, setBalance] = useState<number>(0);
  const [goal, setGoal] = useState<string | undefined>();
  const [series, setSeries] = useState<number[]>([50, 50]);

  const userContext = useContext(UserContext);
  const userID = userContext?.user?.uid || '';
  const userCurrency = userContext?.user?.currency || '';

  const currentMonth = getCurrentMonth();
  const currentMonthInText = month[currentMonth];

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data = [],
  } = useGetIncomeExpenseQuery({uid: userID});

  const {
    // isSuccess,
    // isLoading,
    // isError,
    // error,
    data: goalData = [],
  } = useGetMonthlyGoalQuery({uid: userID});

  // console.log('data', data);

  const calculateData = useCallback(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    let total = 0;

    if (!isEmpty(data)) {
      const filteredData = data.filter(item => item.month === currentMonth);

      filteredData.forEach(item => {
        if (item.type === INCOME) {
          totalIncome += parseInt(item.amount, 10);
        } else {
          totalExpense += parseInt(item.amount, 10);
        }
      });
      total = totalExpense + totalIncome;

      const incomePercentage = (totalIncome / total) * 100 || 0;
      const expensePercentage = (totalExpense / total) * 100 || 0;
      // if (!isNaN(expensePercentage) && !isNaN(incomePercentage)) {

      // }
      setSeries([expensePercentage, incomePercentage]);
      // console.log(expensePercentage, incomePercentage);
      setBalance(totalIncome - totalExpense);
    }
  }, [currentMonth, data]);

  const getGoalForThisMonth = useCallback(() => {
    if (!isEmpty(goalData)) {
      const filteredData = goalData.find(item => item.month === currentMonth);
      setGoal(filteredData?.goal);
    }
  }, [currentMonth, goalData]);

  useEffect(() => {
    calculateData();
    return () => calculateData(); // test this (unsubscribe when no longer in use)
  }, [calculateData]);

  useEffect(() => {
    getGoalForThisMonth();
    return () => getGoalForThisMonth(); // test this (unsubscribe when no longer in use)
  }, [getGoalForThisMonth]);
  //  console.log(isSuccess, isLoading, isError, error, data)

  return (
    <View height="100%" bg={useColorModeValue('#e0e7ff', '#000e21')}>
      <Center>
        {showAlert && (
          <AlertNotice
            alertType={alertMessage.alertType}
            message={alertMessage.message}
            setShowAlert={setShowAlert}
          />
        )}
      </Center>
      <Center padding={6}>
        <Heading marginBottom={4}>{currentMonthInText}</Heading>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut
          coverRadius={0.45}
          coverFill={colorMode === 'light' ? '#e0e7ff' : '#000e21'}
        />

        <HStack m={5}>
          <HStack space={2} marginRight={5}>
            <View style={styles.circleGreen} />
            <Text bold>Income - {series[1].toFixed(2).toString()}%</Text>
          </HStack>

          <HStack space={2}>
            <View style={styles.circleRed} />
            <Text bold>Expense - {series[0].toFixed(2).toString()}%</Text>
          </HStack>
        </HStack>
        <HStack>
          <Button
            marginRight={10}
            backgroundColor="#4f46e5"
            colorScheme="success"
            onPress={() => {
              setShowAddIncomeModal(true);
            }}>
            Add Income
          </Button>
          <Button
            backgroundColor="#facc15"
            onPress={() => {
              setShowAddExpenseModal(true);
            }}>
            <Text color={'black'}>Add Expense</Text>
          </Button>
        </HStack>
        <Center margin={6}>
          <Text>Balance</Text>
          <Box
            bgColor="indigo.400"
            paddingLeft={3}
            paddingRight={3}
            rounded={10}
            shadow={3}>
            <Text fontSize={26} bold color="black">
              {userCurrency} {balance.toFixed(2)}
            </Text>
          </Box>
        </Center>

        <Center>
          {goal ? (
            <>
              <Text>Goal</Text>
              <Box
                bgColor="info.400"
                paddingLeft={3}
                paddingRight={3}
                shadow={3}
                rounded={10}>
                <Text fontSize={26} bold color="black">
                  {userCurrency} {parseInt(goal, 10).toFixed(2)}
                </Text>
              </Box>
            </>
          ) : (
            <Pressable
              onPress={() => {
                setShowAddGoalModal(true);
              }}>
              <Box
                bgColor="info.400"
                paddingLeft={3}
                paddingRight={3}
                shadow={3}
                rounded={10}>
                <HStack space={2}>
                  <Box marginTop={2}>
                    <Icon name="pencil" size={20} color="black" />
                  </Box>
                  <Text fontSize={24} bold color="black">
                    Set Goal
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          )}
        </Center>
        {/* </VStack> */}
      </Center>
      <AddIncomeExpenseModal
        type={INCOME}
        setShowModal={setShowAddIncomeModal}
        showModal={showAddIncomeModal}
        userID={userID}
        currentMonth={currentMonth}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
      />
      <AddIncomeExpenseModal
        type={EXPENSE}
        setShowModal={setShowAddExpenseModal}
        showModal={showAddExpenseModal}
        userID={userID}
        currentMonth={currentMonth}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
      />
      <AddGoalModal
        setShowModal={setShowAddGoalModal}
        showModal={showAddGoalModal}
        userID={userID}
        currentMonth={currentMonth}
        currentMonthInText={currentMonthInText}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  circleRed: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#facc15',
  },
  circleGreen: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#4f46e5',
  },
});
