import React, {FC} from 'react';
import {Box, Text} from 'native-base';

type NoDataMessageProps = {
  description: string;
};

const NoDataMessage: FC<NoDataMessageProps> = (props: NoDataMessageProps) => {
  const {description} = props;

  return (
    <Box
      bgColor="#e5e5e5"
      p={8}
      rounded={3}
      shadow={2}
      marginTop={6}
      marginBottom={12}>
      <Text bold>No Data!</Text>
      <Text>{description}</Text>
    </Box>
  );
};

export default NoDataMessage;
