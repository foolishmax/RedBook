import {ajax} from '../utils';

export const getMessagesList = (page: number, size: number) => {
  return ajax.get<MessageListItem[]>('/messages/list', {page, size});
};

export const getUnRead = () => {
  return ajax.get<UnRead>('/messages/unRead');
};
