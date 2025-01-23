import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {UserProvider} from './src/user/Provider/UserProvider.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from './src/Pages/Loader/loader-page.tsx';
import {OnBoards} from './src/Pages/OnBoards/onBoards-page.tsx';
import {MainScreen} from './src/Pages/Home/main-screen.tsx';
import {TipsOne} from './src/Pages/TipsDad/tips-dad-one.tsx';
import {TipsTwo} from './src/Pages/TipsDad/tips-dad-two.tsx';
import {HealthTips} from './src/Pages/TipsDad/health-tips.tsx';
import {NotesPage} from './src/Pages/Notes/family-notes.tsx';
import {AddNotes} from './src/Pages/Notes/add-notes.tsx';
import {RemindersPage} from './src/Pages/Reminders/reminders-page.tsx';
import {AddReminders} from './src/Pages/Reminders/add-reminders.tsx';
import {Calendar} from './src/Pages/Clendar/calendar-page.tsx';
import {SettingsUser} from './src/Pages/Settings/user-settings.tsx';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}>
          <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="OnBoards" component={OnBoards} />
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="TipsOne" component={TipsOne} />
          <Stack.Screen name="TipsTwo" component={TipsTwo} />
          <Stack.Screen name="HealthTips" component={HealthTips} />
          <Stack.Screen name="Notes" component={NotesPage} />
          <Stack.Screen name="AddNotes" component={AddNotes} />
          <Stack.Screen name="Reminders" component={RemindersPage} />
          <Stack.Screen name="AddReminders" component={AddReminders} />
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="SettingsUser" component={SettingsUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

// const styles = StyleSheet.create({});

export default App;
