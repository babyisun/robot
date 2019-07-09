import {
  observable,
  action,
  runInAction
} from 'mobx';
import {
  message
} from 'antd';
import BaseStroe from '@/stores/BaseStore';
import ajax from '@/utils/ajax';
import {
  loading,
  toProps
} from '#/mobx/decorator';
// import { message } from 'antd';
import URL from '@/utils/api';

// 接口函数统一定义
const Api = {
  getList: params => ajax.get(`${URL.COMMON}list`, {
    params
  }),
};
@toProps('account')
class Account extends BaseStroe {
  // 监听store声明
  @observable total = 0;

  @observable data = null;

  @observable pagination = {
    // 分页
    page_size: 10,
    page: 1,
  };

  @observable formData = {};

  @observable query = {}; // 查询条件

  @action onSearch = (val) => {
    this.query = {
      ...val
    };
    this.pagination.page = 1;
    this.load();
  };

  @action.bound @loading async load() {
    const params = {
      ...this.query,
      ...this.pagination
    };
    const data = await Api.getList(params);
    runInAction(() => {
      if (data && data.success) {
        this.data = data.data.list;
        this.total = data.data.total;
      }
    });
  }

  @action.bound @loading async getDetail(pass_uid) {
    const params = {
      pass_uid
    };
    const data = await Api.getDetail(params);
    runInAction(() => {
      if (data && data.success) {
        this.formData = data.data;
      }
    });
  }

  // 创建、编辑、禁用用户
  @action.bound @loading async submit(values, callback) {
    const data = await Api[values.pass_uid ? 'editUser' : 'addUser']({
      ...values
    });
    runInAction(() => {
      if (data && data.success) {
        message.success('操作成功');
        this.load();
        // eslint-disable-next-line no-unused-expressions
        callback && callback();
      }
    });
  }

  @action.bound clearDetail() {
    this.formData = {};
  }
}
const store = new Account();
export default store;
