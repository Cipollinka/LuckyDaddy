import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
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

export const NotesPage = () => {
  const {user} = useUser();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate(ScreenName.Home);
  };

  const handleAddNotes = () => {
    navigation.navigate(ScreenName.AddNotes);
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/notes_screen.png')}>
        <SafeAreaView style={styles.header}>
          <Text style={styles.title}>Family Notes</Text>
          <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
            <Image source={require('../../assets/images/icons/back.png')} />
            <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.main}>
          {user?.notes?.length ? (
            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}>
              {user.notes.map(note => (
                <View key={note.id} style={styles.noteCard}>
                  <View style={styles.noteHeader}>
                    <Text style={styles.noteName}>{note.name}</Text>
                    <View
                      style={[
                        styles.priorityIndicator,
                        {backgroundColor: note.priority},
                      ]}
                    />
                  </View>
                  <Text style={styles.noteComment}>{note.comment}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <SafeAreaView style={styles.content}>
              <Text style={styles.content_title}>Empty</Text>
              <Text style={styles.content_paragraph}>Add the first note</Text>
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
    gap: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 15,
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
  noteCard: {
    width: 310,
    height: 140,
    alignItems: 'center',
    backgroundColor: 'rgba(152, 103, 171, 1)',
    borderRadius: 18,
    gap: 10,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(175, 121, 197, 1)',
    width: 310,
    height: 54,
    gap: 5,
    borderRadius: 18,
    paddingTop: 15,
  },
  noteName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  noteComment: {
    fontSize: 16,
    color: 'black',
  },
  addBtn: {
    width: 198,
    height: 38,
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});
