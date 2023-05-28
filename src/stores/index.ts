import {createContext, useContext} from 'react';
import ArticleStore from './ArticleStore';
import HomeStore from './HomeStore';
import MessageStore from './MessageStore';
import ShopStore from './ShopStore';
import UserStore from './UserStore';

export const context = createContext({
  homeStore: new HomeStore(),
  userStore: new UserStore(),
  articleStore: new ArticleStore(),
  shopStore: new ShopStore(),
  messageStore: new MessageStore(),
});

const useStore = () => {
  return useContext(context);
};

export default useStore;
