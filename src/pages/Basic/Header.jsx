/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Layout, Tag } from 'antd';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Config from '@/config/config';
import { Me } from '@/pages/Login';
// import Download from '#/page/Download/Download';
import styles from './Header.scss';

@inject('bs')
@observer
class Header extends Component {
  componentDidMount() {
    const { bs } = this.props;
    bs.getUser();
  }

  render() {
    const { bs } = this.props;
    const { user } = bs;
    return (
      <Layout.Header className={[styles.header, bs.collapsed ? styles.small : ''].join(' ')}>
        <div className={styles.des}>{Config.Header.Brief}</div>
        {/* <div className={styles.button}>
          <Download />
        </div> */}
        <Me
          name={user && user.name}
          info={user && [
            { label: '姓名', value: user.name },
            { label: '邮箱', value: user.email },
            { label: '状态', value: <Tag color="green">启用</Tag> },
          ]}
          beforeExit={bs.logout}
          loginUrl={Config.Login.Url}
        />
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
