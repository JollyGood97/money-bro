import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {
  HStack,
  Center,
  View,
  Text,
  Button,
  Switch,
  useColorMode,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

type SettingsProps = {};

const Settings: FC<SettingsProps> = (props: SettingsProps) => {
  const {} = props;
  const {toggleColorMode} = useColorMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Add sign out and select currency option

  return (
    <ScrollView>
      <View padding={10}>
        <Center>
          <HStack space={5}>
            <Text>Use Dark Mode</Text>
            <Switch
              offTrackColor="indigo.100"
              onTrackColor="indigo.200"
              onThumbColor="indigo.500"
              offThumbColor="indigo.50"
              onToggle={() => {
                toggleColorMode();
                setIsDarkMode(!isDarkMode);
              }}
              isChecked={isDarkMode}
            />
          </HStack>
        </Center>
      </View>
    </ScrollView>
  );
};

export default Settings;

// const styles = StyleSheet.create({
//   circleRed: {
//     width: 20,
//     height: 20,
//     borderRadius: 20 / 2,
//     backgroundColor: '#e11d48',
//   },
//   circleGreen: {
//     width: 20,
//     height: 20,
//     borderRadius: 20 / 2,
//     backgroundColor: '#16a34a',
//   },
// });
