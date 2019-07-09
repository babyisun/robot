import {
  observable,
  action,
  runInAction
} from 'mobx';
import BaseStroe from '@/stores/BaseStore';
// import ajax from '@/utils/ajax';
import {
  loading,
  toProps
} from '#/mobx/decorator';
import RobotModel from '@/model/robot';
import AV from '@/utils/av';

import {
  STATUS
} from '@/utils/const';
import {
  LastWeek
} from '#/utils/time';


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

@toProps('robot')
class Robot extends BaseStroe {
  // 监听store声明
  @observable total = 0;

  @observable data = [{
    name: '小鸡鸡'
  }];

  @observable pagination = Default_Props.Pagination;

  @action.bound onClearQuery() {
    this.query = Default_Props.Query;
    this.pagination = Default_Props.Pagination;
  }

  @observable query = Default_Props.Query;

  @action onSearch = (val) => {
    this.query = {
      ...val
    };
    this.pagination.page = 1;
    this.load();
  };


  @action.bound @loading async load() {
    const query = new AV.Query(RobotModel)
      .equalTo('user', this.currUser.id)
      .descending('createdAt')
      .skip(this.page.skip)
      .limit(this.page.limit);
    // const params = {
    //   ...this.query,
    //   ...this.pagination
    // };
    const data = await AV.Promise.all([query.find(), query.count()]);
    // const total = await query.count();
    // const data = await query.find();
    console.log('query', data);
    runInAction(() => {
      if (data) {
        const [list, total] = data;
        this.data = list;
        this.total = total;
      }
    });
  }

  @action.bound @loading async add() {
    const u = this.currUser;
    console.log(u, 'ddd');
    new RobotModel({
      name: '我是机器人',
      groupName: '神奇之群',
      key: 'abc',
      status: STATUS.DEFINE.ON,
      user: u.id,
    }).save().then((data) => {
      console.log('data', data);
    }).catch(error => console.error(error.message));
    // runInAction(() => {
    //   if (data && data.success) {
    //     this.data = data.data.list;
    //   }
    // });
  }

}
const store = new Robot();
export default store;
