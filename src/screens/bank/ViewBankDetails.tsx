import React, {useContext, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useGetFixedDepositsQuery} from '../../api/baseApi';
import {UserContext} from '../../context/UserContext';
import {EXPENSE, INCOME} from '../../constants/Constants';
import {
  Box,
  Button,
  Center,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import AddFDModal from './components/AddFDModal';
import {getFormattedDate} from '../../utils/CommonUtils';

// import {Icon} from 'native-base';

// const Tab = createMaterialTopTabNavigator();

// drawer navigation options
const ViewBankDetails = () => {
  const userContext = useContext(UserContext);

  const userID = userContext?.user?.uid || '';

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data = [],
  } = useGetFixedDepositsQuery({uid: userID});

  const [showAddFDModal, setShowAddFDModal] = useState<boolean>(false);

  return (
    <Box>
      <Center>
        <Heading> Fixed Deposits</Heading>
      </Center>
      <Button
        onPress={() => {
          setShowAddFDModal(true);
        }}>
        Add Fixed Deposit
      </Button>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Box
            borderWidth="3"
            _dark={{
              borderColor: 'muted.50',
            }}
            shadow={6}
            rounded="lg"
            borderColor="indigo.900"
            bgColor={'indigo.100'}
            m={5}
            pl={['0', '4']}
            pr={['0', '5']}
            py="2">
            <Heading fontSize="md" p="4" pb="3" color="blue.900">
              {item.bank}
            </Heading>
            <VStack p={4} marginTop={-2}>
              <HStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  Date of Deposit
                </Text>

                <Spacer />
                <Text
                  fontSize="16px"
                  color="indigo.800"
                  bold
                  _dark={{
                    color: 'warmGray.50',
                  }}>
                  {getFormattedDate(item?.startDate?.toDate() || new Date())}
                </Text>
              </HStack>
              <HStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  Capital Amount
                </Text>

                <Spacer />
                <Text
                  fontSize="16px"
                  color="indigo.800"
                  bold
                  _dark={{
                    color: 'warmGray.50',
                  }}

                  // alignSelf="flex-start"
                >
                  $ {item.deposit}
                </Text>
              </HStack>

              <HStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  Interest Rate
                </Text>

                <Spacer />
                <Text
                  fontSize="16px"
                  color="indigo.800"
                  bold
                  _dark={{
                    color: 'warmGray.50',
                  }}>
                  {item.rate} %
                </Text>
              </HStack>
              <HStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  Payment Mode
                </Text>

                <Spacer />
                <Text
                  fontSize="16px"
                  color="indigo.800"
                  bold
                  _dark={{
                    color: 'warmGray.50',
                  }}>
                  {item.paymentMode}
                </Text>
              </HStack>
            </VStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />

      <AddFDModal
        showModal={showAddFDModal}
        setShowModal={setShowAddFDModal}
        userID={userID}
      />
    </Box>
  );
};
export default ViewBankDetails;
