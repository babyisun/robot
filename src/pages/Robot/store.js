import { observable, action, runInAction } from 'mobx';
import BaseStroe from '@/stores/BaseStore';
import ajax from '@/utils/ajax';
import { loading, toProps } from '#/mobx/decorator';
import URL from '@/utils/api';
import { LastWeek } from '#/utils/time';

// 接口函数统一定义
const api = {
  getList: params => ajax.get(`${URL.COMMON}/lost`, { params }),
};

const Default_Props = {
  Pagination: {
    page_size: 10,
    page: 1,
  },
  Query: {
    start_time: LastWeek[0].unix(),
    end_time: LastWeek[1].unix(),
  },
};

@toProps('list')
class List extends BaseStroe {
  // 监听store声明
  @observable total = 0;

  @observable data = null;

  @observable pagination = Default_Props.Pagination;

  @action.bound onClearQuery() {
    this.query = Default_Props.Query;
    this.pagination = Default_Props.Pagination;
  }

  @observable query = Default_Props.Query;

  @action onSearch = (val) => {
    this.query = { ...val };
    this.pagination.page = 1;
    this.load();
  };


  @action.bound @loading async load() {
    const params = { ...this.query, ...this.pagination };
    const data = await api.getList(params);
    runInAction(() => {
      if (data && data.success) {
        this.data = data.data.list;
        this.total = data.data.total;
      }
    });
  }

}
const store = new List();
export default store;
