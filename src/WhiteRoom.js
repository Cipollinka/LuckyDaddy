import {NavigationContainer} from '@react-navigation/native';
import {Loader} from './Pages/Loader/loader-page';
import {OnBoards} from './Pages/OnBoards/onBoards-page';
import {MainScreen} from './Pages/Home/main-screen';
import {TipsOne} from './Pages/TipsDad/tips-dad-one';
import {TipsTwo} from './Pages/TipsDad/tips-dad-two';
import {HealthTips} from './Pages/TipsDad/health-tips';
import {NotesPage} from './Pages/Notes/family-notes';
import {AddNotes} from './Pages/Notes/add-notes';
import {RemindersPage} from './Pages/Reminders/reminders-page';
import {AddReminders} from './Pages/Reminders/add-reminders';
import {Calendar} from './Pages/Clendar/calendar-page';
import {SettingsUser} from './Pages/Settings/user-settings';
import {UserProvider} from './user/Provider/UserProvider';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function WhiteRoom() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}>
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
