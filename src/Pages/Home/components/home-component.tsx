import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../../user/lib/hooks/use-navigation.tsx';

export const HomeComponent = () => {
  const navigation = useNavigation();
  const handleNotes = () => {
    navigation.navigate(ScreenName.Notes);
  };
  const handleReminders = () => {
    navigation.navigate(ScreenName.Reminders);
  };
  const handleCalendar = () => {
    navigation.navigate(ScreenName.Calendar);
  };
  const handleSettings = () => {
    navigation.navigate(ScreenName.SettingsUser);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.btn_settings}>
          <Text style={styles.setting_title}>Settings</Text>
          <Image
            source={require('../../../assets/images/icons/setting_icon.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.main}>
        <SafeAreaView style={{gap: 10}}>
          <TouchableOpacity onPress={handleReminders}>
            <ImageBackground
              style={styles.image_calendar_reminders}
              source={require('../../../assets/images/card_reminders.png')}>
              <Text style={styles.btn_title}>Reminders</Text>
              <Text style={styles.btn_paragraph}>
                Reminders of important events
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity onPress={handleNotes}>
          <ImageBackground
            style={styles.image_notes}
            source={require('../../../assets/images/card_notes.png')}>
            <Text style={styles.btn_title}>Notes</Text>
            <Text style={[styles.btn_paragraph, {textAlign: 'center'}]}>
              Setting tasks and goals for the whole family
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1)',
  },
  setting_title: {
    fontWeight: '500',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
  },
  btn_settings: {
    width: 96,
    height: 28,
    borderRadius: 24,
    backgroundColor: 'rgba(194, 82, 242, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  main: {
    width: 330,
    height: 238,
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
  },
  image_calendar_reminders: {
    width: 201,
    height: 112,
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 40,
  },
  btn_title: {
    fontWeight: '500',
    fontSize: 24,
    color: 'rgba(0, 0, 0, 1)',
  },
  btn_paragraph: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
  },
  image_notes: {
    width: 112,
    height: 238,
    paddingTop: 15,
    alignItems: 'center',
  },
});
