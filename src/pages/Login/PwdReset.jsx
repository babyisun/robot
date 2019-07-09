/* eslint-disable no-underscore-dangle */
import React, { Fragment, Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, message, Steps } from 'antd';
import styles from './index.scss';

const FormItem = Form.Item;
const { Step } = Steps;

@Form.create()
class PwdReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      active: [['telephone', 'captchaPhone', 'captchaPhoneImg'], ['newPass', 'confirmNewPass']],
      token: '',
      isRefreshCodeImg: '',
      isRefreshCodeNum: '',
      current: 0,
      isLoginLoading: false,
    };
  }

  // 系统发现用户访问存在风险，将回调此方法，让用户输入图形验证码
  getCaptchaImgNum = value => {
    this.setState({ isRefreshCodeNum: value });
  };

  // 获得手机验证码
  onGetCaptcha = () => {
    // 发送短信成功，间隔倒计时开始，会回调此方法
    const startIntervalCallback = () => {};
    // 间隔时间倒数每秒回调
    const intervalsCallback = ({ count }) => {
      this.setState({ count });
    };
    // 间隔时间已结束，会回调此方法
    const endIntervalCallback = ({ errmsg }) => {
      if(errmsg) {
        message.warn(errmsg);        
      }
    };
    // 发送短信失败回调方法
    const failCallback = ({ errmsg }) => {
      message.warn(errmsg || '发送短信失败');
    };
    // 系统发现用户访问存在风险，将回调此方法，让用户输入图形验证码
    const refreshCaptchaCallBack = ({ url }) => {
      this.setState({ isRefreshCodeImg: url });
    };
    this.props.form.validateFields(['telephone'], (err, values) => {
      if (!err) {
        window.refreshVcodeByPhone_v2(
          values.telephone,
          failCallback,
          startIntervalCallback,
          intervalsCallback,
          endIntervalCallback,
          this.state.isRefreshCodeNum,
          refreshCaptchaCallBack,
        );
      }
    });
  };

  submitSetp = values => [
    () => {
      const succCallback = res => {
        this.setState({ isLoginLoading: false });
        // eslint-disable-next-line no-unused-expressions
        this.state.current < 1
        && res.token
        && this.setState(prevState => ({ current: prevState.current + 1, token: res.token }));
      };
      const failCallback = res => {
        this.setState({ isLoginLoading: false });
        if(res.errmsg) {           
          message.warn(res.errmsg);         
        }
      };
      this.setState({ isLoginLoading: true });
      window.validVcodeByPhone(
        values.telephone,
        values.captchaPhone,
        succCallback,
        failCallback,
      );
    },
    () => {
      if (values.newPass !== values.confirmNewPass) {
        message.warn('两次输入的密码不一样');
      } else {
        const succCallback = () => {
          this.setState({ isLoginLoading: false });
          message.success('密码重置成功, 请使用新密码登录', () => {
            window.location.reload();
          });
        };
        const tokenExpiredCallback = res => {
          this.setState({ isLoginLoading: false });
          if(res.errmsg) {           
            message.warn(res.errmsg);         
          }
        };
        const failCallback = res => {
          this.setState({ isLoginLoading: false });
          if(res.errmsg) {           
            message.warn(res.errmsg);         
          }
        };
        window.resetPwd(
          values.newPass,
          this.state.token,
          succCallback,
          tokenExpiredCallback,
          failCallback,
        );
      }
    },
  ];

  handleSubmit = e => {
    e.preventDefault();
    const { active, current } = this.state;
    const { form } = this.props;
    const activeFileds = active[current];
    form.validateFields(activeFileds, { force: true }, (err, values) => {
      if (!err) {
        this.submitSetp(values)[current]();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { count, current, isRefreshCodeImg, isLoginLoading } = this.state;

    const InputPassword = (
      <Fragment>
        <FormItem>
          {getFieldDecorator('newPass', {
            rules: [{ required: true, message: '请输入新密码' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              placeholder="请输入新密码"
              type="password"
              size="large"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirmNewPass', {
            rules: [{ required: true, message: '请确认新密码' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              placeholder="确认新密码"
              type="password"
              size="large"
            />,
          )}
        </FormItem>
      </Fragment>
    );

    const InputPhone = (
      <Fragment>
        <FormItem>
          {getFieldDecorator('telephone', {
            rules: [
              { required: true, message: '请输入手机号' },
              { pattern: /^1\d{10}$/, message: '手机号格式错误' },
            ],
          })(<Input prefix={<Icon type="mobile" />} placeholder="手机号" size="large" />)}
        </FormItem>
        {isRefreshCodeImg && (
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captchaPhoneImg', {
                  rules: [{ required: true, message: '请输入图片验证码重新获取短信验证码' }],
                })(
                  <Input
                    prefix={<Icon type="safety" />}
                    placeholder="请输入图片验证码"
                    size="large"
                    onChange={e => this.getCaptchaImgNum(e.target.value)}
                  />,
                )}
              </Col>
              <Col span={8}>
                <a className={styles.captchaImg} onClick={this.onGetCaptcha}>
                  {isRefreshCodeImg && (
                    <img src={isRefreshCodeImg} alt="验证码" title="点击更换验证码" />
                  )}
                </a>
              </Col>
            </Row>
          </FormItem>
        )}
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captchaPhone', {
                rules: [{ required: true, message: '请输入手机验证码' }],
              })(<Input prefix={<Icon type="mail" />} placeholder="手机验证码" size="large" />)}
            </Col>
            <Col span={8}>
              <Button
                disabled={count && count !== 1}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count && count !== 1 ? `${count} s` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        </FormItem>
      </Fragment>
    );

    const stepPages = [
      {
        title: '验证手机号',
        content: InputPhone,
      },
      {
        title: '重置密码',
        content: InputPassword,
      },
    ];

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <Steps current={current}>
            {stepPages.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </FormItem>
        {stepPages[current].content}
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submit}
            size="large"
            loading={isLoginLoading}
          >
            {current ? '确认并登录' : '下一步'}
          </Button>
        </FormItem>
      </Form>
    );
  }
}
export default PwdReset;
