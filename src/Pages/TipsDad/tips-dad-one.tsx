import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';

const tips = [
  "Be involved in your children's lives. Show interest in their hobbies, achievements, and experiences. This will help children feel your support and love.",
  'Set rules and boundaries. Children should understand that they have certain responsibilities and limitations. However, remember to explain the reasons for your decisions to them.',
  'Maintain an emotional connection with your spouse. Spend time communicating with your wife, share your feelings and experiences. It will strengthen your relationship and create a favorable atmosphere in the family.',
  "Don't be afraid to ask for help. If you feel overwhelmed with all the responsibilities, seek help from loved ones or hire professionals.",
  'Develop yourself as a person. Constantly learn something new, broaden your horizons. It will allow you to better understand the world of your children and have interesting conversations with them.',
];

export const TipsOne = () => {
  const navigation = useNavigation();
  // Генерація випадкової поради при рендері компонента
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  const handleBack = () => {
    navigation.navigate(ScreenName.Home);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/tips_dad_one.png')}>
        <View style={styles.textContainer}>
          <Text style={styles.tipText}>{randomTip}</Text>
        </View>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text>Back</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  textContainer: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Темний фон для тексту
    borderRadius: 10,
  },
  tipText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  backBtn: {
    width: 300,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
