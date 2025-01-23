import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {useState} from 'react';
import {useUser} from '../../user';

export const AddReminders = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser(); // Отримуємо доступ до користувача та функції для оновлення
  const [notification, setNotification] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('green'); // Значення за замовчуванням

  const handleBack = () => {
    navigation.navigate(ScreenName.Reminders);
  };

  const handleCreate = () => {
    const newReminder = {
      name,
      date,
      priority,
      difficulty,
      notification,
    };

    // Оновлення user?.reminders
    if (user) {
      saveUser({
        ...user,
        reminders: [...(user.reminders || []), newReminder], // Додаємо нове нагадування
      });
    }

    // Повернення до списку нагадувань
    navigation.navigate(ScreenName.Reminders);
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/home_bg.png')}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
            <Image source={require('../../assets/images/icons/back.png')} />
            <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView style={styles.main}>
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter text..."
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.inputLabel}>Name</Text>
          </View>

          {/* Date Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="xx/xx/xxxx"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={date}
              onChangeText={setDate}
            />
            <Text style={styles.inputLabel}>Date</Text>
          </View>

          {/* Priority Section */}
          <View style={styles.priorityContainer}>
            <Text style={styles.priorityText}>Priority</Text>
            <View style={styles.priorityOptions}>
              {['green', 'brown', 'red'].map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.priorityCircle,
                    {
                      backgroundColor: color,
                      borderWidth: priority === color ? 2 : 0,
                      borderColor: 'white',
                    },
                  ]}
                  onPress={() => setPriority(color)}
                />
              ))}
            </View>
          </View>

          {/* Difficulty Section */}
          <View style={styles.difficultyContainer}>
            <Text style={styles.difficultyText}>Difficulty</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setDifficulty(star)}>
                  <Text
                    style={[
                      styles.star,
                      difficulty >= star && styles.activeStar,
                    ]}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notification Toggle */}
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>Notification</Text>
            <Switch
              value={notification}
              onValueChange={value => setNotification(value)}
              thumbColor={notification ? '#9c27b0' : '#ccc'}
            />
          </View>

          {/* Create Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 20,
  },
  back_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  back_text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  main: {
    padding: 25,
    gap: 20,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(128, 0, 128, 0.5)',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: 'white',
  },
  inputLabel: {
    position: 'absolute',
    top: 15,
    right: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  priorityContainer: {
    marginBottom: 20,
  },
  priorityText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
  },
  priorityOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  priorityCircle: {
    width: 82,
    height: 32,
    borderRadius: 12,
  },
  difficultyContainer: {
    marginBottom: 20,
  },
  difficultyText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  star: {
    fontSize: 30,
    color: '#bbb',
  },
  activeStar: {
    color: 'rgba(175, 121, 197, 1)',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  createButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
});
