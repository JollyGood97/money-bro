import React from 'react';
import {Spinner, Text, VStack} from 'native-base';

const InProgressNotice = () => {
  return (
    <VStack marginTop={20} space={10} alignItems="center">
      <Spinner color="indigo.500" size="lg" />
      <Text>Please wait, loading data ...</Text>
    </VStack>
  );
};

export default InProgressNotice;
