import {action, observable} from 'mobx';
import {getHomeList} from '../apis';

class HomeStore {
  @observable page: number = 1;

  @observable pageSize: number = 10;

  @observable homeList: ArticleSimple[] = [];

  @observable refreshing: boolean = false;

  getHomeList = async () => {
    if (this.refreshing) {
      return;
    }
    try {
      this.refreshing = true;
      const {data} = await getHomeList(this.page, this.pageSize);

      if (data?.length) {
        if (this.page === 1) {
          this.homeList = data;
        } else {
          this.homeList = [...this.homeList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.homeList = [];
        } else {
          // 没有更多数据
        }
      }
    } finally {
      this.refreshing = false;
    }
  };

  @action
  resetPage = () => {
    this.page = 1;
  };
}

export default HomeStore;
