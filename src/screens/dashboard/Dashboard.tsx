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
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import AddIncomeExpenseModal from '../../common/AddIncomeExpenseModal';
import Transaction from '../../model/Transaction';
import {EXPENSE, INCOME, month} from '../../constants/Constants';
import {UserContext} from '../../context/UserContext';
import {useGetIncomeExpenseQuery} from '../../api/baseApi';
import {isEmpty} from 'lodash';

// move to const file
const widthAndHeight = 250;
// const series = [50, 50]; // need to calculate
const sliceColor = ['#facc15', '#4f46e5'];

type DashboardProps = {};

const Dashboard: FC<DashboardProps> = (props: DashboardProps) => {
  const {} = props;
  const {colorMode} = useColorMode();
  const [showAddIncomeModal, setShowAddIncomeModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [series, setSeries] = useState<number[]>([50, 50]);
  const userContext = useContext(UserContext);
  const userID = userContext?.user?.uid || '';

  const currentMonth = month[new Date().getMonth()];
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data = [],
  } = useGetIncomeExpenseQuery({uid: userID});

  // console.log('data', data);

  const calculateData = useCallback(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    let total = 0;

    if (!isEmpty(data)) {
      const filteredData = data.filter(
        item => item.month === new Date().getMonth(), // uid comparison is not needed
      );

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
  }, [data]);

  useEffect(() => {
    calculateData();
    return () => calculateData(); // test this (unsubscribe when no longer in use)
  }, [calculateData]);
  //  console.log(isSuccess, isLoading, isError, error, data)

  return (
    <View height={'100%'} bg={useColorModeValue('#e0e7ff', '#000e21')}>
      <Center padding={6}>
        <Heading marginBottom={4}>{currentMonth}</Heading>
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
            <Text>Income - {series[1].toFixed(2).toString()}%</Text>
          </HStack>

          <HStack space={2}>
            <View style={styles.circleRed} />
            <Text>Expense - {series[0].toFixed(2).toString()}%</Text>
          </HStack>
        </HStack>
        <HStack>
          <Button
            marginRight={10}
            backgroundColor="#4f46e5"
            colorScheme={'success'}
            onPress={() => {
              setShowAddIncomeModal(true);
            }}>
            Add Income
          </Button>
          <Button
            backgroundColor={'#facc15'}
            onPress={() => {
              setShowAddExpenseModal(true);
            }}>
            <Text color={'black'}>Add Expense</Text>
          </Button>
        </HStack>
        <Center m={10}>
          <Text>Balance</Text>
          <Box
            bgColor={'indigo.400'}
            paddingLeft={3}
            paddingRight={3}
            rounded={10}>
            <Text fontSize={30} bold color={'black'}>
              {balance.toFixed(2)} $
            </Text>
          </Box>
        </Center>
        <Center>
          <Text>Goal</Text>
          <Text fontSize={30} bold>
            100.00 $
          </Text>
        </Center>
        {/* </VStack> */}
      </Center>
      <AddIncomeExpenseModal
        type={INCOME}
        setShowModal={setShowAddIncomeModal}
        showModal={showAddIncomeModal}
        currentMonth={currentMonth}
        userID={userID}
      />
      <AddIncomeExpenseModal
        type={EXPENSE}
        setShowModal={setShowAddExpenseModal}
        showModal={showAddExpenseModal}
        currentMonth={currentMonth}
        userID={userID}
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
