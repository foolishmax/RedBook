import {ajax} from '../utils';

export const getHomeList = (page: number, size: number) => {
  return ajax.post<any[]>('/home/list', {page, size});
};
