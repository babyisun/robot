import {
  observable,
  action,
  runInAction
} from 'mobx';
import AV from 'leancloud-storage';
import {
  message,
} from 'antd';
import BaseStroe from '@/stores/BaseStore';
import ajax from '@/utils/ajax';
import {
  loading,
  toProps
} from '#/mobx/decorator';
import RobotModel from '@/model/robot';
// import AV from '@/utils/av';

// import {
//   STATUS
// } from '@/utils/const';
// import {
//   LastWeek
// } from '#/utils/time';

// 接口函数统一定义
const Api = {
  send: params => ajax.post(`/robot`, {
    ...params
  }),
};

const Default_Props = {
  Pagination: {
    page_size: 10,
    page: 1,
  },
  Query: {
    // start_time: LastWeek[0].unix(),
    // end_time: LastWeek[1].unix(),
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
      .contains('name', this.query.name || '')
      .descending('createdAt');
    // const params = {
    //   ...this.query,
    //   ...this.pagination
    // };
    const data = await AV.Promise.all([query.find(),
      query.skip(this.page.skip).limit(this.page.limit).count()
    ]);
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

  @action.bound @loading async submit(values) {
    const u = this.currUser;
    const key = values.url.split('key=');
    console.log(values.url.split('key='), 'ddd');
    if (key && key.length > 1) {
      // new RobotModel({
      //   name: values.name,
      //   groupName: values.groupName,
      //   url: values.url,
      //   key: key[1],
      //   status: STATUS.DEFINE.ON,
      //   user: u.id,
      // }).save().then(async (data) => {
      // console.log('data', data);
      const result = await Api.send({
        url: values.url,
        user: u.id,
      });
      if (result && result.success) {
        message.success('添加成功，请在企业微信查看测试消息');
      }
      // console.log(data);
      // }).catch(error => message.error(error.message));
    }
  }

  @action.bound clear() {
    this.query = Default_Props.Query;
    this.pagination = Default_Props.Pagination;
  }

}
const store = new Robot();
export default store;
