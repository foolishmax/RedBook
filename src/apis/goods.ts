import {ajax} from '../utils';

export const getGoodsList = (page: number, size: number) => {
  return ajax.get<GoodsSimple[]>('/goods/list', {page, size});
};

export const getTop10Category = () => {
  return ajax.get<any>('/goods/top10');
};
