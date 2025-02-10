import React, {useEffect, useState} from 'react';
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
import {useUser} from '../../user';

export const OnBoards = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser(); // Отримуємо дані користувача та функцію оновлення

  // Якщо користувач уже пройшов онбординг, перенаправляємо на Home
  useEffect(() => {
    // Перевірка, що дані `user` доступні і `onBoards` явно true
    if (user?.onBoards === true) {
      navigation.navigate(ScreenName.Home);
    }
  }, [user, navigation]);

  const pages = [
    {
      image: require('../../assets/images/bg_image_onBoardsOne.png'),
      title: "Being a good father isn't hard",
      description: '',
    },
    {
      image: require('../../assets/images/bg_image_onBoardsTwo.png'),
      title: 'Events Calendar',
      description: 'Create and manage a calendar of family events',
    },
    {
      image: require('../../assets/images/bg_image_onBoardsThree.png'),
      title: 'Reminders',
      description:
        'Reminders of important events, task deadlines, and other important things.',
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Після завершення онбордінгу оновлюємо стан користувача
      saveUser({ ...user, onBoards: true });
      navigation.navigate(ScreenName.Home);
    }
  };

  return (
    <ImageBackground
      source={pages[currentPage].image}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{pages[currentPage].title}</Text>
        {pages[currentPage].description !== '' && (
          <Text style={styles.description}>
            {pages[currentPage].description}
          </Text>
        )}

        {/* Індикатор сторінок */}
        <View style={styles.pagination}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentPage && styles.activeDot]}
            />
          ))}
        </View>

        {/* Кнопка "Next" */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        {/* Terms of Use */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Terms of use</Text>
          <Text style={styles.footerText}>|</Text>
          <Text style={styles.footerText}>Privacy Policy</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
  },
  description: {
    fontSize: 24,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 28,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#AAA',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FFF',
    width: 40,
    height: 8,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#AAA',
    marginHorizontal: 5,
  },
});
