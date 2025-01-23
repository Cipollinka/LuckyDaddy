import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../user';
import React, {useState} from 'react';

export const AddNotes = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [priority, setPriority] = useState<string | null>(null);

  const handleBack = () => {
    navigation.navigate(ScreenName.Notes);
  };

  const handleCreate = () => {
    if (!name.trim() || !comment.trim() || !priority) {
      Alert.alert(
        'Validation Error',
        'Please fill all fields and select a priority.',
      );
      return;
    }

    const newNote = {
      id: Date.now(), // Унікальний ідентифікатор
      name,
      comment,
      priority,
    };

    // Збереження нової нотатки
    const updatedNotes = [...(user?.notes || []), newNote];
    saveUser({...user, notes: updatedNotes});
    Alert.alert('Success', 'Note added successfully!');
    navigation.navigate(ScreenName.Notes); // Повертаємось до сторінки нотаток
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/home_bg.png')}>
        <SafeAreaView style={styles.header}>
          <Text style={styles.title}>Add Family Notes</Text>
          <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
            <Image source={require('../../assets/images/icons/back.png')} />
            <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.main}>
          {/* Поле для вводу імені */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter name..."
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.inputLabel}>Name</Text>
          </View>

          {/* Поле для вводу коментаря */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter comment..."
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              multiline={true}
              value={comment}
              onChangeText={setComment}
            />
            <Text style={styles.inputLabel}>Comment</Text>
          </View>

          {/* Секція для вибору пріоритету */}
          <View style={styles.priorityContainer}>
            <Text style={styles.priorityText}>Priority</Text>
            <View style={styles.priorityOptions}>
              <TouchableOpacity
                onPress={() => setPriority('green')}
                style={[
                  styles.priorityCircle,
                  {
                    backgroundColor: 'green',
                    borderWidth: priority === 'green' ? 2 : 0,
                    borderColor: 'white',
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => setPriority('brown')}
                style={[
                  styles.priorityCircle,
                  {
                    backgroundColor: 'brown',
                    borderWidth: priority === 'brown' ? 2 : 0,
                    borderColor: 'white',
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => setPriority('red')}
                style={[
                  styles.priorityCircle,
                  {
                    backgroundColor: 'red',
                    borderWidth: priority === 'red' ? 2 : 0,
                    borderColor: 'white',
                  },
                ]}
              />
            </View>
          </View>

          {/* Кнопка створення */}
          <TouchableOpacity onPress={handleCreate} style={styles.createButton}>
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
    marginTop: 15,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputLabel: {
    position: 'absolute',
    top: 15,
    right: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  priorityContainer: {
    marginBottom: 30,
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
