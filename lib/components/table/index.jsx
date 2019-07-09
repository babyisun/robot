import React from 'react';
import { Table } from 'antd';
import { isNull } from '#/utils/format';
import styles from './index.scss';

const EMPTY_ICON = '--';

/* 重写render方法，如果返回值无效，则返回-- */
const dealInvalid = (columns) => {
  columns.forEach(item => {
    if (Array.isArray(item.children)) {
      dealInvalid(item.children);
      return;
    }
    const render = item.render || ((text) => text);
    item.render = (text, row, index) => {
      const res = render(text, row, index);
      return isNull(res) ? EMPTY_ICON : res;
    };
  });
};

const List = props => {
  dealInvalid(props.columns);
  let page = {
    // hideOnSinglePage: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    onChange: props.onChangePage,
    onShowSizeChange: props.onChangePage,
    showTotal: total => `共 ${total} 条`,
  };

  if (props.pagination) {
    page = { ...page, ...props.pagination };
  }

  return (
    <Table
      className={styles.table}
      rowKey={(row, i) => props.unique && row[props.unique] ? row[props.unique] : i}
      bordered
      {...props}
      pagination={props.pagination && page}
    />
  );
};

export default List;
