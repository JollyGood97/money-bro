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
import InProgressNotice from '../../common/InProgressNotice';
import AlertMsg from '../../model/AlertMsg';
import AlertNotice from '../../common/Alert';
import {isEmpty} from 'lodash';
import NoDataMessage from '../../common/NoDataMessage';

const ViewBankDetails = () => {
  const userContext = useContext(UserContext);
  const userID = userContext?.user?.uid || '';
  const userCurrency = userContext?.user?.currency || '';

  const {isLoading, data = []} = useGetFixedDepositsQuery({uid: userID});

  const [showAddFDModal, setShowAddFDModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMsg>({} as AlertMsg);

  return (
    <View height="100%" bg={useColorModeValue('#f5f5f4', '#000e21')}>
      {isLoading ? (
        <InProgressNotice />
      ) : (
        <>
          {showAlert && (
            <AlertNotice
              alertType={alertMessage.alertType}
              message={alertMessage.message}
              setShowAlert={setShowAlert}
            />
          )}

          <View flex={1} mt={5}>
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
            {isEmpty(data) && (
              <Box paddingLeft={5} paddingRight={5}>
                <NoDataMessage description="No data. Start adding to view deposits." />
              </Box>
            )}
            <FlatList
              data={data}
              renderItem={({item}) => (
                <Box
                  borderWidth="3"
                  shadow={8}
                  rounded="lg"
                  borderColor="indigo.900"
                  bgColor={
                    item.paymentMode === 'Monthly' ? 'indigo.200' : 'blue.100'
                  }
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
                        {getFormattedDate(
                          item?.startDate?.toDate() || new Date(),
                        )}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text color="coolGray.800" bold>
                        Next Renewal Date
                      </Text>

                      <Spacer />
                      <Text fontSize="16px" color="indigo.800" bold>
                        {getFormattedDate(
                          new Date(
                            item.renewalDate
                              ?.toDate()
                              .setMonth(
                                item.renewalDate?.toDate().getMonth() +
                                  parseInt(item.period, 10),
                              ),
                          ) || new Date(),
                        )}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text color="coolGray.800" bold>
                        Capital Amount
                      </Text>

                      <Spacer />
                      <Text fontSize="16px" color="indigo.800" bold>
                        {userCurrency} {item.deposit}
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
                    {item.paymentMode === 'Maturity' && (
                      <HStack>
                        <Text color="indigo.800" bold>
                          Outstanding Amount
                        </Text>

                        <Spacer />
                        <Text fontSize="16px" color="indigo.800" bold>
                          {userCurrency} {item.outstandingAmount}
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                </Box>
              )}
              keyExtractor={item => item.id}
            />

            <AddFDModal
              showModal={showAddFDModal}
              setShowModal={setShowAddFDModal}
              userID={userID}
              setShowAlert={setShowAlert}
              setAlertMessage={setAlertMessage}
            />
          </View>
        </>
      )}
    </View>
  );
};
export default ViewBankDetails;
