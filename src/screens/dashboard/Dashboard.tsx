import React, {FC} from 'react';
import {Text, View} from 'react-native';

type DashboardProps = {};

const Dashboard: FC<DashboardProps> = (props: DashboardProps) => {
  const {} = props;

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
