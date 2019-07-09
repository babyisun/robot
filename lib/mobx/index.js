// 原BaseStore，mobx基类，建议继承
import {
  observable,
  configure,
  action,
} from 'mobx';
import { asyncAction } from './mobxUtils';

configure({
  enforceActions: 'always',
});

// 所有mobx store建议基础自 MobXBase
export default class MobXBase {
  constructor() {
    this.init();
  }

  init() {
    if (this.loading) {
      this.loading.forEach(item => {
        asyncAction(this, item);
      });
    }
  }

  @observable version = '';

  @action render() {
    console.log('base render');
    this.version = +new Date();
  }
}
