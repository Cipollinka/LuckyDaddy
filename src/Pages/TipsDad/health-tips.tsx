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
  'Observe your daily routine. Try to wake up and go to bed at the same time every day, even on weekends. This will help your body get used to a certain rhythm and improve the quality of your sleep.',
  'Watch your diet. Try to eat more vegetables, fruits, whole grain products and lean proteins. Limit your intake of sugar, salt and saturated fats. This will help you maintain a healthy weight and reduce your risk of developing chronic diseases.',
  'Engage in physical activity. Regular exercise can help strengthen muscles, improve cardiovascular function and increase stamina. Choose an activity you enjoy and incorporate it into your daily routine.',
  "Avoid stress. Stress can take a toll on your health, so it's important to find ways to reduce your stress levels. Try meditation, yoga, or deep breathing. Also, don't forget the importance of rest and make time for hobbies and activities.",
  'Get regular medical check-ups. Even if you feel fine, regular check-ups with your doctor can help detect possible health problems early.',
];

export const HealthTips = () => {
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
        source={require('../../assets/images/health_tips.png')}>
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
