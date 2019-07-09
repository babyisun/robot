import { observable, action, toJS } from 'mobx';
import ajax from '@/utils/ajax';
import { toProps } from '#/mobx/decorator';

@toProps('export')
class Export {
  @observable modalVisible = false;

  @observable query = null;

  @observable showLogListDot = false;

  @action.bound setModalVisible(visible) {
    this.modalVisible = visible;
  }

  @action.bound setExportVisible(values) {
    this.query = values;
    this.setModalVisible(true);
  }

  // @action.bound async onExport(apiUrl, treeID) {
  @action.bound async onExport(apiUrl, param) {
    let params = { ...toJS(this.query), ...{ page: 1, page_size: 10 } };
    if (param) {
      // params.tree_node_value = treeID;
      params = { ...params, ...param };
    }
    console.log('export', params);
    await ajax.get(apiUrl, { params });
    this.setModalVisible(false);
    this.setLogListDot(true);
  }

  @action.bound setLogListDot(value) {
    this.showLogListDot = value;
  }
}

const store = new Export();
export default store;
