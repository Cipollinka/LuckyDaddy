import {createContext, useContext} from 'react';
import {User} from '../../types.ts';

interface UserContextProps {
  user: User | null;
  saveUser: (newState: {
    reminders: any[];
    nickName: string;
    image: string;
    onBoards: number[];
    notes: any[];
    calendar: any[];
  }) => Promise<void>;
  clearUser: () => void;
  clearUserProgress: () => void;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContext');
  }

  return context;
};
