import React, {useRef, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  PanResponder,
} from 'react-native';
import {HomeComponent} from './components/home-component.tsx';
import {UsefulTipsComponent} from './components/useful-tips-component.tsx';

export const MainScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  // Розрахунок висоти індикатора
  const indicatorHeight =
    contentHeight > 0 && scrollViewHeight > 0
      ? Math.min(16, (scrollViewHeight / contentHeight) * 71) // Обмеження висоти індикатора
      : 16;

  // Панель для взаємодії з кастомною смугою прокрутки
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (contentHeight > 0 && scrollViewHeight > 0) {
        let scrollPosition =
          (gestureState.dy / scrollViewHeight) * contentHeight;

        // Забезпечити, що значення в допустимих межах
        scrollPosition = Math.max(
          0,
          Math.min(scrollPosition, contentHeight - scrollViewHeight),
        );

        scrollViewRef.current?.scrollTo({y: scrollPosition, animated: false});
      }
    },
  });

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const indicatorPosition =
      contentHeight > 0 && scrollViewHeight > 0
        ? (scrollY / contentHeight) * 71
        : 0;

    Animated.timing(scrollIndicator, {
      toValue: indicatorPosition,
      duration: 0,
      useNativeDriver: false, // Використовується зі стилями
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../assets/images/home_bg.png')}>
        <View style={styles.scrollWrapper}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            onContentSizeChange={(width, height) => setContentHeight(height)}
            onLayout={event =>
              setScrollViewHeight(event.nativeEvent.layout.height)
            }
            onScroll={handleScroll}
            scrollEventThrottle={16}>
            <View style={styles.container}>
              <HomeComponent />
              <UsefulTipsComponent />
            </View>
          </ScrollView>

          {/* Кастомна смуга прокрутки */}
          <View style={styles.scrollBar}>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.scrollIndicator,
                {
                  height: indicatorHeight, // Використання indicatorHeight
                  transform: [{translateY: scrollIndicator}],
                },
              ]}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  scrollWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  container: {
    marginTop: 20,
  },
  scrollBar: {
    width: 8,
    height: 71, // Висота смуги прокрутки
    backgroundColor: 'rgba(181, 134, 200, 1)',
    borderRadius: 35.5, // Напівкруглий ефект
    marginHorizontal: 11,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: '50%', // Відступ від верхнього краю
  },
  scrollIndicator: {
    width: 16,
    backgroundColor: 'rgba(250, 250, 250, 1)',
    borderRadius: 8, // Круглий індикатор
    position: 'absolute',
  },
});
