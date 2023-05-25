import {createContext, useContext} from 'react';
import HomeStore from './HomeStore';
import UserStore from './UserStore';

export const context = createContext({
  homeStore: new HomeStore(),
  userStore: new UserStore(),
});

const useStore = () => {
  return useContext(context);
};

export default useStore;
