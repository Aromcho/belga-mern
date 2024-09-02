import React, { createContext, useContext } from 'react';
import UserStore from './UserStoreser';

const StoreContext = createContext({ userStore: new UserStore() });

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ userStore: new UserStore() }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
