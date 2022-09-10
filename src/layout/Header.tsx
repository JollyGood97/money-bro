import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HamburgerIcon} from 'native-base';

type HeaderProps = {
  title: string;
  navigation: any;
};

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {title, navigation} = props;
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <HamburgerIcon
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
});
