import React, {ReactNode} from 'react';
import {UserContext, useUserStorage} from '../index.ts';

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {user, saveUser, clearUser, clearUserProgress, isLoading} =
    useUserStorage();

  return (
    <UserContext.Provider
      value={{saveUser, user, clearUser, clearUserProgress, isLoading}}>
      {children}
    </UserContext.Provider>
  );
};
