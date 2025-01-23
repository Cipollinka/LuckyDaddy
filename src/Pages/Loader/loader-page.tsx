import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';

export const Loader = () => {
  const [activeDot, setActiveDot] = useState(0);
  const navigation = useNavigation();

  // Ефект для циклічного підсвічування точок
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % 3); // 3 точки
    }, 500); // Час між змінами

    return () => {
      clearInterval(interval);
    };
  });
  setTimeout(() => {
    navigation.navigate(ScreenName.OnBoards); // Змініть 'NextPage' на ім'я вашого компонента
  }, 3000);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/loaders.png')}>
        <View style={styles.loaderContainer}>
          <View style={styles.dotsContainer}>
            {[...Array(3)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeDot === index && styles.activeDot, // Активна точка
                ]}
              />
            ))}
          </View>
        </View>
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
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    padding: 50,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#444', // Темний колір
    marginHorizontal: 11,
  },
  activeDot: {
    backgroundColor: '#FFF', // Світлий колір для активної точки
    marginBottom: 20,
  },
});
