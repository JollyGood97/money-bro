import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

// Have to ignore typescript as following imports are images.
// @ts-ignore
import Slide1 from '../../assets/introSlider/slide1.svg';
// @ts-ignore
import Slide2 from '../../assets/introSlider/slide2.svg';
// @ts-ignore
import AppLogo from '../../assets/appLogo.svg';

type IntroProps = {
  setShowRealApp: Function;
};

const Intro: FC<IntroProps> = (props: IntroProps) => {
  const {setShowRealApp} = props;

  const renderItem = ({item}: {item: any}) => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        {item.title !== '' && (
          <Text style={styles.introTextStyle}>{item.title}</Text>
        )}
        {item.image}
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };

  return (
    <React.Fragment>
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
      />
    </React.Fragment>
  );
};

export default Intro;

const styles = StyleSheet.create({
  imageStyle: {
    marginTop: 30,
  },
  introTextStyle: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Hard to keep track of your finances?',
    title: '',
    image: <Slide1 />,
    backgroundColor: '#000080',
  },
  {
    key: 's2',
    title: '',
    text: 'Having trouble remembering where your money disappeared to?',
    image: <Slide2 />,
    backgroundColor: '#22bcb5',
  },
  {
    key: 's3',
    title: "Don't Worry!",
    text: 'MoneyBro will take care of it!',
    image: <AppLogo />,
    backgroundColor: '#3395ff',
  },
];
