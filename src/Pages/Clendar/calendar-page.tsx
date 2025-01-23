import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar as RNCalendar} from 'react-native-calendars';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../user';

export const Calendar = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [eventText, setEventText] = useState(''); // Текст події
  const [eventPriority, setEventPriority] = useState<string | null>(null); // Пріоритет події
  const today = new Date().toISOString().split('T')[0]; // Поточна дата у форматі YYYY-MM-DD

  // Створюємо markedDates з подій
  const markedDates = {
    ...user?.calendar?.reduce((acc: any, event: any) => {
      acc[event.date] = {
        selected: true,
        marked: true,
        selectedColor: event.priority, // Використовуємо пріоритет як колір
      };
      return acc;
    }, {}),
    ...(selectedDate && {
      [selectedDate]: {
        selected: true,
        marked: true,
        selectedColor: eventPriority || 'blue', // Виділення для нової дати
      },
    }),
    [today]: {
      selected: !selectedDate || selectedDate === today, // Виділяємо сьогоднішню дату
      marked: false,
      selectedColor: 'blue',
    },
  };

  const handleDateSelect = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null); // Скидання дати
    } else {
      setSelectedDate(date); // Встановлення нової дати
      setOpenModal(true);
    }
  };

  const handleBack = () => {
    navigation.navigate(ScreenName.Home);
  };

  const handleSaveEvent = () => {
    if (!selectedDate || !eventText || !eventPriority) return;

    // Оновлюємо `user?.calendar`, додаючи нову подію
    const updatedCalendar = [
      ...(user?.calendar || []),
      {
        date: selectedDate,
        text: eventText,
        priority: eventPriority,
      },
    ];

    saveUser({
      ...user,
      calendar: updatedCalendar,
    });

    // Скидаємо стан після збереження
    setOpenModal(false);
    setEventText('');
    setEventPriority(null);
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/calendar_page.png')}>
        <SafeAreaView style={styles.header}>
          <Text style={styles.title}>Family Calendar</Text>
          <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
            <Image source={require('../../assets/images/icons/back.png')} />
            <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.main}>
          <View style={styles.calendarContainer}>
            <RNCalendar
              markedDates={markedDates}
              onDayPress={day => handleDateSelect(day.dateString)}
              theme={{
                calendarBackground: 'rgba(255, 255, 255, 0.9)',
                textSectionTitleColor: 'black',
                selectedDayBackgroundColor: 'blue',
                todayTextColor: 'white',
                arrowColor: 'black',
                dayTextColor: 'black',
                textDisabledColor: 'gray',
                dotColor: 'red',
                selectedDotColor: 'white',
              }}
            />
          </View>
          <SafeAreaView style={styles.content}>
            <View style={styles.content_title}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{gap: 15}}>
                  {!user?.calendar?.length
                    ? 'Empty'
                    : user.calendar.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 15,
                            backgroundColor: 'rgba(175, 121, 197, 1)',
                            borderRadius: 18,
                          }}>
                          <Text>{item.text}</Text>
                          <Text>{item.date}</Text>
                        </View>
                      ))}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
          <Modal
            visible={openModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setOpenModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalHeader}>{selectedDate}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter text..."
                  placeholderTextColor="#D0CDE1"
                  value={eventText}
                  onChangeText={setEventText}
                />
                <View style={styles.priorityRow}>
                  <TouchableOpacity
                    style={[
                      styles.priorityCircle,
                      {
                        backgroundColor: 'green',
                        borderWidth: eventPriority === 'green' ? 2 : 0,
                      },
                    ]}
                    onPress={() => setEventPriority('green')}
                  />
                  <TouchableOpacity
                    style={[
                      styles.priorityCircle,
                      {
                        backgroundColor: 'orange',
                        borderWidth: eventPriority === 'orange' ? 2 : 0,
                      },
                    ]}
                    onPress={() => setEventPriority('orange')}
                  />
                  <TouchableOpacity
                    style={[
                      styles.priorityCircle,
                      {
                        backgroundColor: 'red',
                        borderWidth: eventPriority === 'red' ? 2 : 0,
                      },
                    ]}
                    onPress={() => setEventPriority('red')}
                  />
                </View>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={handleSaveEvent}>
                  <Text style={styles.completeButtonText}>Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    padding: 20,
  },
  calendarContainer: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  content: {
    gap: 17,
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
  },
  content_title: {
    width: 310,
    height: 150,
  },
  content_paragraph: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'rgba(45, 38, 75, 0.5)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E2C41',
    marginBottom: 16,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D0CDE1',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2E2C41',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  priorityCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  completeButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#A389F3',
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
