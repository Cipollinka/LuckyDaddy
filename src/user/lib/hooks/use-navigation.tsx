import {
  CommonActions,
  useNavigation as useStackNavigation,
  useNavigationState,
} from '@react-navigation/native';

export enum ScreenName {
  Loader = 'Loader',
  Home = 'Home',
  OnBoards = 'OnBoards',
  TipsOne = 'TipsOne',
  TipsTwo = 'TipsTwo',
  HealthTips = 'HealthTips',
  Notes = 'Notes',
  AddNotes = 'AddNotes',
  Reminders = 'Reminders',
  AddReminders = 'AddReminders',
  Calendar = 'Calendar',
  SettingsUser = 'SettingsUser',
}

export const useNavigation = () => {
  const {dispatch} = useStackNavigation();

  const currentScreen = useNavigationState(state =>
    state?.routes ? state.routes[state.index].name : '',
  );

  const navigate = (screen: ScreenName, params?: Record<string, any>) => {
    if (currentScreen === screen) {
      return;
    }
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screen, params}],
      }),
    );
  };
  return {navigate, currentScreen};
};
