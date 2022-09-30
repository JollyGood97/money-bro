import React, {useContext, useState} from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useGetFixedDepositsQuery} from '../../api/BaseApi';
import {UserContext} from '../../context/UserContext';
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  View,
  VStack,
} from 'native-base';
import AddFDModal from './components/AddFDModal';

import {getFormattedDate} from '../../utils/CommonUtils';

const ViewBankDetails = () => {
  const userContext = useContext(UserContext);

  const userID = userContext?.user?.uid || '';

  const {
    // isSuccess,
    // isLoading,
    // isError,
    // error,
    data = [],
  } = useGetFixedDepositsQuery({uid: userID});

  const [showAddFDModal, setShowAddFDModal] = useState<boolean>(false);

  return (
    <View height="100%" bg={useColorModeValue('white', '#000e21')}>
      <Box marginTop={5}>
        <HStack marginRight={4}>
          <Heading marginLeft={4}> Fixed Deposits</Heading>
          <Spacer />
          <Button
            onPress={() => {
              setShowAddFDModal(true);
            }}>
            <HStack>
              <Icon name="plus-circle-outline" size={20} color="white" />
              <Text color="white" bold>
                {' '}
                Add
              </Text>
            </HStack>
          </Button>
        </HStack>

        <FlatList
          data={data}
          renderItem={({item}) => (
            <Box
              borderWidth="3"
              _dark={{
                borderColor: 'muted.50',
              }}
              shadow={8}
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
                  <Text color="coolGray.800" bold>
                    Date of Deposit
                  </Text>

                  <Spacer />
                  <Text fontSize="16px" color="indigo.800" bold>
                    {getFormattedDate(item?.startDate?.toDate() || new Date())}
                  </Text>
                </HStack>
                <HStack>
                  <Text color="coolGray.800" bold>
                    Capital Amount
                  </Text>

                  <Spacer />
                  <Text fontSize="16px" color="indigo.800" bold>
                    $ {item.deposit}
                  </Text>
                </HStack>

                <HStack>
                  <Text color="coolGray.800" bold>
                    Interest Rate
                  </Text>

                  <Spacer />
                  <Text fontSize="16px" color="indigo.800" bold>
                    {item.rate} %
                  </Text>
                </HStack>
                <HStack>
                  <Text color="coolGray.800" bold>
                    Payment Mode
                  </Text>

                  <Spacer />
                  <Text fontSize="16px" color="indigo.800" bold>
                    {item.paymentMode}
                  </Text>
                </HStack>
                <HStack>
                  <Text color="coolGray.800" bold>
                    Deposit Period
                  </Text>

                  <Spacer />
                  <Text fontSize="16px" color="indigo.800" bold>
                    {item.period}
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
    </View>
  );
};
export default ViewBankDetails;
