import {ajax} from '../utils';

export const login = (data: {phone: string; password: string}) => {
  return ajax.post('/user/login', data);
};
