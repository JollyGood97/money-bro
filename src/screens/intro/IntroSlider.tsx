import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

// Have to ignore typescript as following imports are images.
// @ts-ignore
import Slide1 from '../../assets/introSlider/slide1.svg';
// @ts-ignore
import Slide2 from '../../assets/introSlider/slide2.svg';
// @ts-ignore
import Slide3 from '../../assets/introSlider/slide3.svg';
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
    width: 200,
    height: 200,
    marginTop: 30,
  },
  introTextStyle: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Hard to keep track of your finances?',
    title: '',
    image: <Slide1 style={styles.imageStyle} />,
    backgroundColor: '#134e4a',
  },
  {
    key: 's2',
    title: '',
    text: 'Having trouble remembering where your money disappeared to?',
    image: <Slide2 style={styles.imageStyle} />,
    backgroundColor: '#a21caf',
  },
  {
    key: 's3',
    title: '',
    text: 'Need a helping hand to manage your finances?',
    image: <Slide3 />,
    backgroundColor: '#eab308',
  },
  {
    key: 's4',
    title: "Don't Worry!",
    text: 'MoneyBro will take care of it!',
    image: <AppLogo style={styles.imageStyle} />,
    backgroundColor: '#000080',
  },
];
