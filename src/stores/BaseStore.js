import {
  observable,
  action,
  runInAction,
  // runInAction,
} from 'mobx';
// import AV from 'leancloud-storage';
import {
  Modal
} from 'antd';
import MobXBase from '#/mobx';
import {
  USER_STATUS
} from '@/utils/const';
import ajax from '@/utils/ajax';

// import AV from '@/utils/av';

// 接口函数统一定义
const Api = {
  getUser: () => ajax.get(`/ucenter/profile`),
  logout: () => ajax.get(`/ucenter/logout`),
};

export default class BaseStroe extends MobXBase {
  @observable getUserLoading = false;

  @observable user = null;

  @observable privilege = null;

  @observable currPage = null; // [{ name: '首页', path: '/' }];

  // 菜单收起展开状态
  @observable collapsed = false;

  // 获取用户信息、权限
  // @action.bound getUser() {
  //   const u = AV.User.current();
  //   console.log("current user:", u);
  //   if (u && u.attributes) {
  //     if (u.attributes.status === USER_STATUS.DEFINE.ON) {
  //       this.user = {
  //         ...u.attributes,
  //         id: u.id
  //       };
  //     } else {
  //       Modal.error({
  //         title: '账号异常',
  //         content: '对不起，您的账号已被禁用，请联系管理员。',
  //         onOk() {
  //           AV.User.logOut();
  //           window.location.replace('/#/login');
  //         },
  //       });
  //     }
  //   } else {
  //     window.location.replace('/#/login');
  //   }
  // }
  @action.bound async getUser() {
    this.getUserLoading = true;
    const data = await Api.getUser();
    if (data && data.success) {
      const u = data.data;
      if (u) {
        if (u.status === USER_STATUS.DEFINE.ON) {
          runInAction(() => {
            this.user = {
              ...u,
              id: u.objectId
            };
            console.log('user:', this.user);
            this.getUserLoading = false;
          });
        } else {
          Modal.error({
            title: '账号异常',
            content: '对不起，您的账号已被禁用，请联系管理员。',
            onOk() {
              this.logout();
            },
          });
          runInAction(() => {
            this.getUserLoading = false;
          });
        }
      } else {
        runInAction(() => {
          this.getUserLoading = false;
        });
        window.location.replace('/#/login');
      }
    }

  }

  // get currUser() {
  //   const u = AV.User.current();
  //   if (u && u.attributes) {
  //     return {
  //       ...u.attributes,
  //       id: u.id
  //     };
  //   }
  //   return {};
  // }

  // @action.bound currUser() {
  //   const u = AV.User.current();
  //   if (u && u.attributes) {
  //     return { ...u.attributes, id: u.id};
  //   } 
  //   return null;
  // }

  @action.bound setCurrPage(json) {
    this.currPage = json;
  }

  @action.bound setCollapse(b) {
    this.collapsed = b;
  }

  @action.bound hasAuth(code) {
    return !!code; // offline 暂时返回true 
    // return this.privilege && this.privilege.some(item => `${item}`.includes(code));
  }

  @action.bound logout() {
    // AV.User.logOut();
    Api.logout();
    this.user = null;
    window.location.replace('/#/login');
  }

  // 清空查询条件
  @action clear() {
    this.pagination = {
      page: 1,
      page_size: 10,
    };
    this.query = {};
  }

  // 列表翻页统一方法
  @action onChangePage = (page, page_size, treeID) => {
    console.log(page)
    if (this.pagination && this.load) {
      this.pagination.page = page;
      this.pagination.page_size = page_size;
      this.load(treeID);
      console.log('baseStore: page changed');
    }
  };

  get page() {
    if (this.pagination) {
      const skip = (this.pagination.page - 1) * this.pagination.page_size;
      const limit = this.pagination.page_size;
      console.log('baseStore: get page', skip, limit);
      return {
        skip,
        limit
      };
    }
    return null;
  };
}
