import React, {FC} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

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

        <Image style={styles.imageStyle} source={item.image} />
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
    text: "Don't know a thing about managing finances?",
    title: '',
    image: require('../../assets/slide1.png'),
    backgroundColor: '#000080',
  },
  {
    key: 's2',
    title: '',
    text: 'Having trouble remembering where your money disappeared to?',
    image: require('../../assets/slide2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: '',
    text: 'Hate anything related to the word finance? Need help?',
    image: require('../../assets/slide3.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: "Don't Worry!",
    text: 'MoneyBro will take care of it!',
    image: require('../../assets/appLogo.png'),
    backgroundColor: '#3395ff',
  },
];
