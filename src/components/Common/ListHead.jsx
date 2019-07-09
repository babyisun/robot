import React from 'react';
import { Button, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import treeFilter from '#/utils/treeFilter';
import router from '@/router';

import styles from './ListHead.scss';

// eslint-disable-next-line max-len
const getListHeadTitle = (path, data) =>
  treeFilter(data, item => path.startsWith(item.path)).pop().name;

const ListHead = ({
  title,
  btn = '',
  btnDisabled = false,
  onCreate,
  icon = 'plus',
  type = 'default',
  match: { path },
}) => {
  const defaultTile = getListHeadTitle(path, router);
  const button = btn && (
    <Col span={12} style={{ textAlign: 'right' }}>
      {Array.isArray(btn) ? (
        btn.map((b, i) => (
          <Button key={i} className={b.class} type={b.type ? b.type : type} onClick={b.onCreate}>
            {b.name}
          </Button>
        ))
      ) : (
        <Button
          disabled={btnDisabled}
          icon={btnDisabled ? '' : icon}
          onClick={onCreate}
          type={type}
        >
          {btn}
        </Button>
      )}
    </Col>
  );
  return (
    <Row type="flex" justify="space-between" className={styles.cardHeader}>
      <Col span={12}>
        <h2>{title === undefined ? defaultTile : title}</h2>
      </Col>
      {button}
    </Row>
  );
};

export default withRouter(ListHead);
