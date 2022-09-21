import React, {FC} from 'react';
import {Text, View} from 'react-native';

type OverallSummaryProps = {};

const OverallSummary: FC<OverallSummaryProps> = (
  props: OverallSummaryProps,
) => {
  const {} = props;

  return (
    <View>
      <Text>Overall Summary</Text>
    </View>
  );
};

export default OverallSummary;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
