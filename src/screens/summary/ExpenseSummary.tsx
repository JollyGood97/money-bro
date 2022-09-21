import React, {FC} from 'react';
import {Text, View} from 'react-native';

type ExpenseSummaryProps = {};

const ExpenseSummary: FC<ExpenseSummaryProps> = (
  props: ExpenseSummaryProps,
) => {
  const {} = props;

  return (
    <View>
      <Text>Expenses Summary</Text>
    </View>
  );
};

export default ExpenseSummary;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
