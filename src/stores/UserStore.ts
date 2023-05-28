import {login} from '../apis';
import Loading from '../components/widget/Loading';
import {save} from '../utils';

class UserStore {
  userInfo: any = null;
  async login(phone: string, password: string, cb: (value: boolean) => void) {
    Loading.show();
    try {
      const {data} = await login({phone, password});
      if (data) {
        save('userInfo', data);
        this.userInfo = data;
        cb(true);
      } else {
        cb(false);
      }
    } finally {
      Loading.hide();
    }
  }

  setUserInfo = (user: any) => {
    this.userInfo = user;
  };
}

export default UserStore;
