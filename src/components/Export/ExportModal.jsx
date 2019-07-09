import React from 'react';
import { Modal, Icon } from 'antd';

const ExportModal = ({ modalVisible, modalClose, onExport, apiUrl, param }) => (
  <Modal
    title="导出"
    visible={modalVisible}
    onCancel={modalClose}
    onOk={() => onExport(apiUrl, param)}
    destroyOnClose
  >
    <p>将按照当前查询项（包含所有分页内容）发起导出请求</p>
    <p>导出过程可能需要一点时间</p>
    <p>
      {'详细情况您可以点击右上角 '}
      {<Icon type="snippets" theme="twoTone" />}
      {' 按钮查看导出状态并下载相关导出内容'}
    </p>
  </Modal>
);

export default ExportModal;
