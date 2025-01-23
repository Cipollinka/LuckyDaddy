import {
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

export const UsefulTipsComponent = () => {
  const navigation = useNavigation();
  const handleTipsOne = () => {
    navigation.navigate(ScreenName.TipsOne);
  };
  const handleTipsTwo = () => {
    navigation.navigate(ScreenName.TipsTwo);
  };
  const handleHealthTips = () => {
    navigation.navigate(ScreenName.HealthTips);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Useful tips</Text>
      <SafeAreaView style={{alignItems: 'center', gap: 22}}>
        <View>
          <ImageBackground
            style={styles.buttons}
            source={require('../../../assets/images/button_tips_one.png')}>
            <SafeAreaView style={styles.buttons_footer}>
              <Text style={styles.paragraph}>5 tips for dad</Text>
              <TouchableOpacity onPress={handleTipsOne} style={styles.open_button}>
                <Text style={styles.open_text}>Open</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            style={styles.buttons}
            source={require('../../../assets/images/button_tips_two.png')}>
            <SafeAreaView style={styles.buttons_footer}>
              <Text style={styles.paragraph}>5 tips for dad</Text>
              <TouchableOpacity onPress={handleTipsTwo} style={styles.open_button}>
                <Text style={styles.open_text}>Open</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            style={styles.buttons}
            source={require('../../../assets/images/button_tips_three.png')}>
            <SafeAreaView style={styles.buttons_footer}>
              <Text style={styles.paragraph}>5 Health tips</Text>
              <TouchableOpacity onPress={handleHealthTips} style={styles.open_button}>
                <Text style={styles.open_text}>Open</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    gap: 32,
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1)',
  },
  buttons: {
    width: 330,
    height: 124,
    justifyContent: 'flex-end',
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  buttons_footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paragraph: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  open_button: {
    width: 80,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  open_text: {
    fontWeight: '600',
    fontSize: 12,
    color: 'rgba(181, 134, 200, 1)',
  },
});
