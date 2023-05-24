import {login} from '../apis';
import {save} from '../utils';

class UserStore {
  userInfo: any = null;
  async login(phone: string, password: string, cb: (value: boolean) => void) {
    const {data} = await login({phone, password});
    if (data) {
      save('userInfo', data);
      this.userInfo = data;
      cb(true);
    } else {
      cb(false);
    }
  }
}

export default new UserStore();
