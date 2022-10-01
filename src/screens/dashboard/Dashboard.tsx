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
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddIncomeExpenseModal from '../../common/AddIncomeExpenseModal';
import AddGoalModal from './components/AddGoalModal';

import {UserContext} from '../../context/UserContext';
import {EXPENSE, INCOME, month} from '../../constants/Constants';
import {
  useGetFixedDepositsQuery,
  useGetIncomeExpenseQuery,
  useGetMonthlyGoalQuery,
  useAddIncomeExpenseMutation,
  useEditFixedDepositMutation,
} from '../../api/BaseApi';
import {getCurrentMonth} from '../../utils/CommonUtils';
import AlertNotice from '../../common/Alert';
import AlertMsg from '../../model/AlertMsg';
import NoDataMessage from '../../common/NoDataMessage';
import InProgressNotice from '../../common/InProgressNotice';

const widthAndHeight = 250;
const sliceColor = ['#facc15', '#4f46e5'];

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

  const {data = [], isLoading} = useGetIncomeExpenseQuery({uid: userID});
  const {data: goalData = []} = useGetMonthlyGoalQuery({uid: userID});
  const {data: fdData = []} = useGetFixedDepositsQuery({uid: userID});
  const [addIncomeExpense] = useAddIncomeExpenseMutation();
  const [editFixedDeposit] = useEditFixedDepositMutation();

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

      if (incomePercentage !== 0 || expensePercentage !== 0) {
        setSeries([expensePercentage, incomePercentage]);
      }
      setBalance(totalIncome - totalExpense);
    }
  }, [currentMonth, data]);

  const getGoalForThisMonth = useCallback(() => {
    if (!isEmpty(goalData)) {
      const filteredData = goalData.find(item => item.month === currentMonth);
      setGoal(filteredData?.goal);
    }
  }, [currentMonth, goalData]);

  const calculateFD = useCallback(async () => {
    if (!isEmpty(fdData)) {
      const matchedDateFD = fdData.find(
        fd =>
          new Date(
            fd.startDate
              ?.toDate()
              .setMonth(
                fd.startDate?.toDate().getMonth() + parseInt(fd.period, 10),
              ),
          )?.toLocaleDateString() === new Date().toLocaleDateString() &&
          new Date(
            fd.startDate
              ?.toDate()
              .setMonth(
                fd.startDate?.toDate().getMonth() + parseInt(fd.period, 10),
              ),
          )?.toLocaleDateString() !==
            fd.renewalDate?.toDate()?.toLocaleDateString(),
      );
      if (matchedDateFD) {
        if (matchedDateFD.paymentMode === 'Monthly') {
          const newInterest =
            (parseInt(matchedDateFD.rate, 10) / 100) *
            parseInt(matchedDateFD.deposit, 10);
          try {
            await addIncomeExpense({
              type: INCOME,
              description: `Monthly Interest from FD at ${matchedDateFD.bank}`,
              amount: newInterest.toString(),
              month: currentMonth,
              uid: userID,
            }).then(() => {
              editFixedDeposit({
                id: matchedDateFD.id,
                renewalDate: new Date(),
                outstandingAmount: matchedDateFD.deposit,
              });
              setShowAlert(true);
              setAlertMessage({
                alertType: 'success',
                message: `Added Monthly Interest ${userCurrency}${newInterest} from FD at ${matchedDateFD.bank} as income`,
              });
            });
          } catch (error) {
            setShowAlert(true);
            setAlertMessage({
              alertType: 'error',
              message: 'Failed to add Monthly Interest.',
            });
          }
        } else {
          const newInterest =
            (parseInt(matchedDateFD.rate, 10) / 100) *
            parseInt(matchedDateFD.outstandingAmount, 10);

          try {
            await editFixedDeposit({
              id: matchedDateFD.id,
              renewalDate: new Date(),
              outstandingAmount:
                parseInt(matchedDateFD.outstandingAmount, 10) + newInterest,
            }).then(() => {
              setShowAlert(true);
              setAlertMessage({
                alertType: 'success',
                message: `Added Interest at Maturity ${userCurrency}${newInterest} from FD at ${matchedDateFD.bank}. Please go to Bank Details screen to view new outstanding amount. `,
              });
            });
          } catch (error) {
            setShowAlert(true);
            setAlertMessage({
              alertType: 'error',
              message: 'Failed to add Interest at Maturity',
            });
          }
        }
      }
    }
    // no need to add userID here as it's from context and won't change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addIncomeExpense, currentMonth, fdData]);

  useEffect(() => {
    calculateData();
    return () => calculateData(); // (unsubscribe when no longer in use)
  }, [calculateData]);

  useEffect(() => {
    getGoalForThisMonth();
    return () => getGoalForThisMonth(); // (unsubscribe when no longer in use)
  }, [getGoalForThisMonth]);

  useEffect(() => {
    const asyncCalculateInterest = () => {
      calculateFD();
    };
    asyncCalculateInterest();
    return () => asyncCalculateInterest(); // (unsubscribe when no longer in use)
  }, [calculateFD]);

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
        {isLoading && <InProgressNotice />}
        {!isLoading &&
        isEmpty(data.filter(item => item.month === currentMonth)) ? (
          <NoDataMessage
            description={
              'Please start adding income or expense data to see a chart here.'
            }
          />
        ) : (
          <>
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
          </>
        )}

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
