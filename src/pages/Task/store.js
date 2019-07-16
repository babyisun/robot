import {
  observable,
  action,
  runInAction
} from 'mobx';
import {
  message
} from 'antd';
// import AV from 'leancloud-storage';
import BaseStroe from '@/stores/BaseStore';
import ajax from '@/utils/ajax';
import {
  loading,
  toProps
} from '#/mobx/decorator';
// import { message } from 'antd';


// 接口函数统一定义
const Api = {
  getList: params => ajax.get('/task/list', {
    params
  }),
  create: params => ajax.post('/task/create', {
    ...params
  }),
  detail: params => ajax.get('/task/detail', {
    params
  }),
};
@toProps('task')
class Task extends BaseStroe {
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
      ...this.page,
      ...this.query
    };
    const data = await Api.getList(params);
    console.log('query', data);
    runInAction(() => {
      if (data && data.success) {
        const [list, total] = data.data;
        this.data = list;
        this.total = total;
      }
    });
  }

  @action.bound @loading async getDetail(objectId) {
    const params = {
      objectId
    };
    const data = await Api.detail(params);
    runInAction(() => {
      if (data && data.success) {
        this.formData = data.data;
      }
    });
  }

  // 创建、编辑、禁用用户
  @action.bound @loading async submit(values) {
    const data = await Api.create({
      ...values
    });
    if (data && data.success) {
      message.success('任务创建成功，得令', () => window.location.replace('/#/task'));
    }
  }

  @action.bound clear() {
    this.formData = {};
  }
}
const store = new Task();
export default store;
