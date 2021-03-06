import React, { Component, Fragment } from 'react';
// import AV from 'leancloud-storage';
import { Form, Icon, Input, Button, message, Spin } from 'antd';
// import Cookie from 'js-cookie';
import { inject } from 'mobx-react';
// import { R_EMAIL } from '#/utils/pattern';
import ajax from '@/utils/ajax';

import PwdReset from './PwdReset';
import ChangePassword from './ChangePassword';
import Me from './Me';
import Register from './Register';
import styles from './index.scss';

const FormItem = Form.Item;

@Form.create()
@inject('bs')
class LoginPage extends Component {
  static defaultProps = {
    header: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      type: 'account',
      active: {
        account: ['username', 'password', 'captcha'],
        // mobile: ['telephone', 'captchaPhone', 'captchaPhoneImg'],
      },
      // imgUrl: '',
      isLoginLoading: false,
      feature: 0,
    };
  }

  componentDidMount() {
    // this.getPicCode();
  }

  // 获取登录图片验证码
  // getPicCode = () => {
  //   const refreshCaptchaCode = res => {
  //     this.setState({ imgUrl: res.url });
  //   };
  //   window.refreshCaptcha(refreshCaptchaCode, { color: '000000' });
  // };

  handleSubmit = e => {
    e.preventDefault();
    const { active, type } = this.state;
    const { form } = this.props;
    const activeFileds = active[type];
    form.validateFields(activeFileds, { force: true }, async (err, values) => {
      if (!err) {
        this.setState({ isLoginLoading: true });
        const { username, password } = values;
        if (type === 'account') {
          const params = { username, password };
          const data = await ajax.post('/ucenter/login', params);
          if (data && data.success) {
            this.loginSuccessCallback(data);
          }
          this.setState({ isLoginLoading: false });
          // AV.User.logIn(username, password)
          //   .then(
          //     loginedUser => {
          //       // 登录成功
          //       console.log('user:', loginedUser);
          //       this.loginSuccessCallback();
          //     },
          //     error => {
          //       if (error && error.rawMessage) {
          //         message.error(error.rawMessage);
          //       }
          //     },
          //   )
          //   .finally(() => this.setState({ isLoginLoading: false }));
        }
      }
    });
  };

  // 登录成功
  loginSuccessCallback = (data) => {
    // console.log(data);
    // Cookie.set('u', data);
    this.user = data;
    const { homeUrl = '/' } = this.props;
    this.setState({ isLoginLoading: false }, () => {
      window.location.replace(homeUrl);
    });
  };

  successSetPassword = () => {
    const { loginUrl } = this.props;
    message.success('设置密码成功，请使用新密码登录', 1).then(() => {
      this.setState({ isLoginLoading: false }, () => {
        window.location.replace(loginUrl);
      });
    });
    // message.success('设置密码成功，请使用新密码登录');
    // this.setState({ isLoginLoading: false, token: null });
  };

  // token 过期
  expired = ({ errmsg }) => {
    message.warn(`${errmsg}，请重新登录`);
    this.setState({ isLoginLoading: false });
  };

  // 登录失败
  loginFailCallback = ({ errmsg }) => {
    this.setState({ isLoginLoading: false });
    message.error(errmsg || '登录失败');
  };

  // 去往注册页面
  handleRegister = () => this.setState({ feature: 2 });

  // 去往修改页面
  handlePwdPass = () => this.setState({ feature: 1 });

  handleInit = () => this.setState({ feature: 0 });

  renderAccount = () => {
    const {
      form: { getFieldDecorator },
      register = false,
    } = this.props;
    // const { imgUrl } = this.state;

    return (
      <Fragment>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名' },
              // { pattern: R_EMAIL, message: '用户名为注册邮箱' },
            ],
          })(<Input prefix={<Icon type="user" />} placeholder="用户名（注册邮箱）" size="large" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" />} placeholder="密码" type="password" size="large" />,
          )}
        </FormItem>
        {/* <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(<Input prefix={<Icon type="safety" />} placeholder="验证码" size="large" />)}
            </Col>
            <Col span={8}>
              <a className={styles.captchaImg} onClick={this.getPicCode}>
                {imgUrl && <img src={imgUrl} alt="验证码" title="点击更换验证码" />}
              </a>
            </Col>
          </Row>
        </FormItem> */}
        <div className={styles.forget}>
          {register ? (
            <a onClick={this.handleRegister} className="actionItem">
              去注册
            </a>
          ) : null}
          <a onClick={this.handlePwdPass}>忘记密码</a>
        </div>
      </Fragment>
    );
  };

  renderContent = () => {
    const { isLoginLoading, feature } = this.state;
    switch (feature) {
      case 0:
        return (
          <Spin tip="登录中..." spinning={isLoginLoading}>
            <Form onSubmit={this.handleSubmit}>
              {this.renderAccount()}
              <FormItem>
                <Button type="primary" htmlType="submit" className={styles.submit} size="large">
                  登录
                </Button>
              </FormItem>
            </Form>
          </Spin>
        );
      case 1:
        return <PwdReset />;
      case 2:
        return <Register />;
      default:
        return null;
    }
  };

  render() {
    const { header } = this.props;
    return (
      <div className={styles.login}>
        <div className={styles.area}>
          {this.state.feature !== 0 ? (
            <Icon onClick={this.handleInit} size="small" type="left" className="retrun-icon" />
          ) : null}
          <div className={styles.loginHeader}>{header}</div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export { Me, ChangePassword };

export default LoginPage;
