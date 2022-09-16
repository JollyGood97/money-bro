import React, {FC, useContext, useState} from 'react';
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
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import AddIncomeExpenseModal from '../../common/addIncomeExpenseModal/AddIncomeExpenseModal';
import {EXPENSE, INCOME, month} from '../../constants/Constants';
import {UserContext} from '../../context/UserContext';
import {useGetIncomeExpenseQuery} from '../../api/baseApi';

// move to const file
const widthAndHeight = 250;
const series = [50, 50]; // need to calculate
const sliceColor = ['#ff7700', '#16a34a'];

type DashboardProps = {};

const Dashboard: FC<DashboardProps> = (props: DashboardProps) => {
  const {} = props;
  const {colorMode} = useColorMode();
  const [showAddIncomeModal, setShowAddIncomeModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  const userContext = useContext(UserContext);
  const userID = userContext?.user?.uid || '';

  const currentMonth = month[new Date().getMonth()];
  const {isSuccess, isLoading, isError, error, data} = useGetIncomeExpenseQuery(
    {showAddIncomeModal, uid: userID},
  );
  return (
    <ScrollView>
      <View padding={10} bg={useColorModeValue('#e0e7ff', '#000e21')}>
        <Center>
          <Text>Data for: {currentMonth}</Text>
          {console.log(isSuccess, isLoading, isError, error, data)}
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
              <Text>Income - ${series[0]}%</Text>
            </HStack>

            <HStack space={2}>
              <View style={styles.circleRed} />
              <Text>Expense - ${series[1]}%</Text>
            </HStack>
          </HStack>
          <HStack>
            <Button
              marginRight={10}
              colorScheme={'success'}
              onPress={() => {
                setShowAddIncomeModal(true);
              }}>
              Add Income
            </Button>
            <Button
              backgroundColor={'#ff7700'}
              onPress={() => {
                setShowAddExpenseModal(true);
              }}>
              Add Expense
            </Button>
          </HStack>
          <Center m={10}>
            <Text>Balance</Text>
            <Box
              bgColor={'success.200'}
              paddingLeft={3}
              paddingRight={3}
              rounded={10}>
              <Text fontSize={30} bold color={'black'}>
                50.00 $
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
      </View>
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
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  circleRed: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#ff7700',
  },
  circleGreen: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#16a34a',
  },
});
