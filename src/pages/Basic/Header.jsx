/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Layout, Tag } from 'antd';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import CryptoJS from 'crypto-js';
// import { AES, /* LEVEL */ } from '@/config';
import Config from '@/config/config';
import { Me } from '@/pages/Login';
// import Download from '#/page/Download/Download';
import styles from './Header.scss';

@inject('bs')
@observer
class Header extends Component {
  // componentDidMount() {
  //   const { bs } = this.props;
  //   bs.getUser();
  // }

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
            // { label: '等级', value: CryptoJS.AES.decrypt(user.level, `${AES.KEY}${user.email}`).toString(CryptoJS.enc.Utf8) },
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
