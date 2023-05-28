import {observable} from 'mobx';
import {getMessagesList, getUnRead} from './../apis/messages';

class MessageStore {
  @observable page: number = 1;

  @observable pageSize: number = 10;

  @observable messagesList: MessageListItem[] = [];

  @observable refreshing: boolean = false;

  @observable unRead: UnRead = {} as UnRead;

  getMessagesList = async () => {
    if (this.refreshing) {
      return;
    }
    try {
      this.refreshing = true;
      const {data} = await getMessagesList(this.page, this.pageSize);

      if (data?.length) {
        if (this.page === 1) {
          this.messagesList = data;
        } else {
          this.messagesList = [...this.messagesList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.messagesList = [];
        } else {
          // 没有更多数据
        }
      }
    } finally {
      this.refreshing = false;
    }
  };

  getUnRead = async () => {
    const {data} = await getUnRead();

    if (data) {
      this.unRead = data;
    }
  };
}

export default MessageStore;
