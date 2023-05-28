import {ajax} from '../utils';

export const getHomeList = (page: number, size: number) => {
  return ajax.post<ArticleSimple[]>('/home/list', {page, size});
};
