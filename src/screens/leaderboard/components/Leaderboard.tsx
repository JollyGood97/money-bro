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
  Menu,
  Button,
} from 'native-base';
import {EXPENSE, INCOME, month} from '../../../constants/Constants';
import Transaction from '../../../model/Transaction';
import isEmpty from 'lodash/isEmpty';

type LeaderboardProps = {
  data: Transaction[];
  type: string;
};

const Leaderboard: FC<LeaderboardProps> = (props: LeaderboardProps) => {
  // const data: Transaction[] = props.route.params.data || [];
  const {data, type} = props;

  // insert down icon
  return (
    <Box>
      <Center>
        <Heading fontSize="xl" p="4" pb="3">
          {type}
        </Heading>
        <Menu
          w="190"
          trigger={() => {
            return (
              <Button>
                <Text>Category </Text>
              </Button>
            );
          }}>
          <Menu.Item>Highest Savings</Menu.Item>
          <Menu.Item>Highest Income</Menu.Item>
          <Menu.Item>Highest Expense</Menu.Item>
        </Menu>
      </Center>
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
