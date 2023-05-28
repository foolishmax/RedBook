import {ajax} from '../utils';

export const getArticleDetail = (id: number) => {
  return ajax.get<any>('/article/detail', {id});
};
