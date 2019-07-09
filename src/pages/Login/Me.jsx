import React from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import ChangePassword from './ChangePassword';
import UserInfo from './UserInfo';
import styles from './index.scss';

const { Item } = Menu;

/**
 * 用户入口组件。
 *
 * @param {string} name
 * 用户展示的姓名
 *
 * @param {object} info
 * 用户详细信息
 * [
 *   { label: '姓名', value: '张三'},
 *   { label: '角色', value: '管理员'},
 *   { label: '电话', value: '13211112222'},
 * ]
 *
 * @param {function} beforeExit
 * 退出前回调函数
 *
 * @param {string} loginUrl
 * 登录地址相对目录
 *
 */
export default class Me extends React.Component {
  state = {
    isShowPwd: false,
    isShowUserInfo: false,
  };

  onExit = callback => {
    if (callback) callback();
  };

  handleShowPwd = v => this.setState({ isShowPwd: v });

  handleShowUserInfo = v => this.setState({ isShowUserInfo: v });

  renderDropMenu = () => {
    const { info, beforeExit } = this.props;
    return (
      <Menu>
        {info && (
          <Item>
            <a onClick={() => this.handleShowUserInfo(true)}>个人信息</a>
          </Item>
        )}
        <Item>
          <a onClick={() => this.handleShowPwd(true)}>修改密码</a>
        </Item>
        <Item>
          <a onClick={() => this.onExit(beforeExit)}>退出</a>
        </Item>
      </Menu>
    );
  };

  render() {
    const { name, info, loginUrl, beforeExit } = this.props;
    const { isShowPwd, isShowUserInfo } = this.state;
    return (
      <div className={styles.info}>
        <div className={styles.name}>
          {name && (
            <>
              <Avatar
                title="个人信息"
                size="small"
                icon="user"
                onClick={() => this.handleShowUserInfo(true)}
              />
              <Dropdown overlay={this.renderDropMenu()} placement="bottomCenter">
                <a className={styles.me}>
                  {name}
                  <Icon className={styles.icon} type="down" />
                </a>
              </Dropdown>
              <ChangePassword
                loginUrl={loginUrl}
                visible={isShowPwd}
                hideModal={() => this.handleShowPwd(false)}
              />
            </>
          )}
          {info && (
            <UserInfo
              data={info}
              visible={isShowUserInfo}
              hideModal={() => this.handleShowUserInfo(false)}
            />
          )}
          {!info && !name && (
            <Avatar
              title="退出"
              size="small"
              icon="poweroff"
              onClick={() => this.onExit(beforeExit)}
            />
          )}
        </div>
      </div>
    );
  }
}
