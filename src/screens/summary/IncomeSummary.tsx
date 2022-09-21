import React, {FC} from 'react';
import {Text, View} from 'react-native';

type IncomeSummaryProps = {};

const IncomeSummary: FC<IncomeSummaryProps> = (props: IncomeSummaryProps) => {
  const {} = props;

  return (
    <View>
      <Text>Income Summary</Text>
    </View>
  );
};

export default IncomeSummary;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
