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
  'Pay attention to your health. Taking care of yourself will help you be more energetic and effective as a parent. Remember to eat right, exercise, and rest.',
  'Spend time together as a family. Organize joint activities, trips, and entertainment. It will bring you closer to your children and make your family more cohesive.',
  'Listen to your children. Let them express their thoughts and feelings. It will show them that you respect their opinion and are ready to support them.',
  'Be patient and understanding. Remember that children are learning and growing, and sometimes it takes them longer to understand certain things. Be prepared to explain complex concepts in simple words.',
  'Love your family. Express your love and care through words, actions, and attention. Your support and warmth will help children grow up happy and confident.',
];

export const TipsTwo = () => {
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
        source={require('../../assets/images/tips_dad_two.png')}>
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
