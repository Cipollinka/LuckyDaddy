import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Switch,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../user';

const ReminderItem = ({reminder}: any) => {
  return (
    <View style={styles.reminderCard}>
      <View style={styles.reminderHeader}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.reminderText}>{reminder.name}</Text>
          <Text
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: reminder.priority,
            }}
          />
        </View>
        <Switch
          value={reminder.notification}
          onValueChange={() => {}}
          thumbColor={reminder.notification ? 'green' : 'gray'}
        />
      </View>
      <View style={styles.difficulty}>
        {[...Array(5)].map((_, index) => (
          <Text
            key={index}
            style={[
              styles.star,
              index < reminder.difficulty
                ? styles.activeStar
                : styles.inactiveStar,
            ]}>
            ★
          </Text>
        ))}
      </View>
      <Text style={styles.reminderDate}>{reminder.date}</Text>
    </View>
  );
};

export const RemindersPage = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate(ScreenName.Home);
  };

  const handleAddNotes = () => {
    navigation.navigate(ScreenName.AddReminders);
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={user?.reminders ? require('../../assets/images/reminders_page.png') : require('../../assets/images/bg_image_onBoardsThree.png')}>
        <SafeAreaView style={styles.header}>
          <Text style={styles.title}>Reminders</Text>
          <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
            <Image source={require('../../assets/images/icons/back.png')} />
            <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.main}>
          {user?.reminders ? (
            <FlatList
              data={user.reminders}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <ReminderItem reminder={item} />}
              contentContainerStyle={styles.remindersList}
            />
          ) : (
            <SafeAreaView style={styles.content}>
              <Text style={styles.content_title}>Empty</Text>
              <Text style={styles.content_paragraph}>Add the first event</Text>
            </SafeAreaView>
          )}
          <TouchableOpacity onPress={handleAddNotes} style={styles.addBtn}>
            <Text>Add new</Text>
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
    padding: 25,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
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
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  content: {
    gap: 17,
    alignItems: 'center',
  },
  content_title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  content_paragraph: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  addBtn: {
    width: 198,
    height: 38,
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  remindersList: {
    gap: 20,
  },
  reminderCard: {
    width: 310,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  difficulty: {
    flexDirection: 'row',
    marginTop: 10,
  },
  star: {
    fontSize: 18,
    marginRight: 5,
  },
  activeStar: {
    color: '#FFD700',
  },
  inactiveStar: {
    color: '#555',
  },
  reminderDate: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
