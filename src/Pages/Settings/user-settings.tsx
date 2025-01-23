import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../user';

export const SettingsUser = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [image, setImage] = useState(user?.image || '');
  const [nickName, setNickName] = useState(user?.nickName || '');

  const handleBack = () => {
    navigation.navigate(ScreenName.Home);
  };

  const toggleSwitch = () =>
    setIsNotificationEnabled(previousState => !previousState);

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImage(selectedImage.uri || '');
      }
    });
  };

  const handleSaveProfile = async () => {
    if (!nickName.trim()) {
      Alert.alert('Error', 'Nickname cannot be empty.');
      return;
    }

    if (!image) {
      Alert.alert('Error', 'Please select an image.');
      return;
    }

    try {
      await saveUser({
        ...user,
        nickName,
        image,
      });
      Alert.alert('Profile updated successfully!');
    } catch (error) {
      Alert.alert('Failed to update profile.');
    }
  };
  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/user_page.png')}>
        <SafeAreaView style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
            <Image source={require('../../assets/images/icons/back.png')} />
            <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView style={styles.main}>
          {/* Avatar Section */}
          <TouchableOpacity
            style={styles.addAvatar}
            onPress={handleSelectImage}>
            {image ? (
              <Image source={{uri: image}} style={styles.avatarImage} />
            ) : (
              <Image
                source={require('../../assets/images/icons/add_user_avatar.svg')}
              />
            )}
          </TouchableOpacity>

          {/* Input Section */}
          <TextInput
            style={styles.textInput}
            placeholder="Enter your nickname..."
            placeholderTextColor="#ccc"
            value={nickName}
            onChangeText={setNickName}
          />

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleSaveProfile}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Terms of use/Privacy Policy</Text>
          </TouchableOpacity>

          <View style={styles.notificationContainer}>
            <Text style={styles.optionText}>Notification</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isNotificationEnabled ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isNotificationEnabled}
            />
          </View>
        </View>
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
    gap: 10,
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
    alignItems: 'center',
    gap: 20,
  },
  addAvatar: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 500,
  },
  textInput: {
    width: 350,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'rgba(175, 121, 197, 1)',
    color: '#000',
  },
  editButton: {
    width: 350,
    padding: 15,
    backgroundColor: 'rgba(175, 121, 197, 1)',
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  settingsContainer: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  optionButton: {
    width: 350,
    padding: 15,
    backgroundColor: 'rgba(175, 121, 197, 1)',
    borderRadius: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  notificationContainer: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(175, 121, 197, 1)',
    borderRadius: 10,
  },
});
