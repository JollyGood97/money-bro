import React, {FC} from 'react';
import {Text, View} from 'react-native';

type ViewSummaryProps = {};

const ViewSummary: FC<ViewSummaryProps> = (props: ViewSummaryProps) => {
  const {} = props;

  return (
    <View>
      <Text>Summary</Text>
    </View>
  );
};

export default ViewSummary;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
