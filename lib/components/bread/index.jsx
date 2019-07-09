import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import styles from './index.scss';

/**
 * Path - 面包屑导航组件
 * @param {object} data - 导航数据源 e.g. [{ name: '首页', path: '/'}, { name: '关于'}]
 */
const Path = ({ data }) => data && data.length > 0 && (
<Breadcrumb className={styles.path}>
  {data.map(({ name, bpath }, i) => (
    <Breadcrumb.Item key={i}>
      {bpath === undefined || i === 0 || i === data.length - 1 ? (
        name
      ) : (
        <NavLink to={bpath}>{name}</NavLink>
      )}
    </Breadcrumb.Item>
  ))}
</Breadcrumb>
);

export default Path;
