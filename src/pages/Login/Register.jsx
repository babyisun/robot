/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import AV from 'leancloud-storage';
import { Form, Icon, Input, Button, message, Spin, Modal } from 'antd';
import CryptoJS from 'crypto-js';
import { AES, LEVEL } from '@/config';
import { R_EMAIL, R_PASSWORD } from '#/utils/pattern';
import { USER_STATUS } from '@/utils/const';

import styles from './index.scss';

// import AV from '@/utils/av';


const FormItem = Form.Item;

@Form.create()
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginLoading: false,
    };
  }

  // 获得邮箱验证码
  // onGetCaptcha = () => {
  //   this.props.form.validateFields(['registerEmail'], async (err, values) => {
  //     if (!err) {
  //       const data = await AV.User.requestEmailVerify(values.registerEmail);
  //       console.log(data);
  //     }
  //   });
  // };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(
      ['registerEmail','registerName', 'registerPass', 'registerConfirmPass'],
      { force: true },
      (err, values) => {
        if (!err) {
          if (values.registerPass !== values.registerConfirmPass) {
            message.warn('两次密码不一致');
          } else {
            console.log('submit', values);
            const user = new AV.User();
            user.setUsername(values.registerEmail);
            user.setPassword(values.registerPass);
            user.setEmail(values.registerEmail);
            // 记录姓名、默认启用状态
            const params = { name: values.registerName,
              status: USER_STATUS.DEFINE.ON,
              level: CryptoJS.AES.encrypt(LEVEL.NORMAL, `${AES.KEY}${values.registerEmail}`).toString()
             };
            user.signUp(params).then(
              loginedUser => {
                // 注册成功
                console.log(loginedUser);
                Modal.success({
                  title: '恭喜您，已成功领养小机器人~',
                  content: (
                    <div>
                      <p>请前往邮箱({values.registerEmail})激活</p>
                      <p>之后就可以登录系统啦~</p>
                    </div>
                  ),
                  onOk() {
                    window.location.reload();
                  },
                });
              },
              error => {
                if (error && error.rawMessage) message.error(error.rawMessage);
              },
            );
          }
        }
      },
    );
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { isLoginLoading } = this.state;
    const inputPassword = (
      <div className="current">
        <FormItem>
          {getFieldDecorator('registerEmail', {
            rules: [
              { required: true, message: '邮箱账号必填喔' },
              { pattern: R_EMAIL, message: '请输入正确的邮箱账号' },
            ],
          })(<Input prefix={<Icon type="mail" />} placeholder="邮箱" size="large" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('registerName', {
            rules: [
              { required: true, message: '请填写真实姓名' },
            ],
          })(<Input prefix={<Icon type="user" />} placeholder="真实姓名" size="large" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('registerPass', {
            rules: [
              { required: true, message: '请确认新密码' },
              { pattern: R_PASSWORD, message: '至少6个字符且含有数字和字母的组合' },
            ],
          })(
            <Input
              prefix={<Icon type="lock" />}
              placeholder="输入密码"
              type="password"
              size="large"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('registerConfirmPass', {
            rules: [{ required: true, message: '请确认密码' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              placeholder="确认密码"
              type="password"
              size="large"
            />,
          )}
        </FormItem>
      </div>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Spin spinning={isLoginLoading}>
          {inputPassword}
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.submit} size="large">
              注册
            </Button>
          </FormItem>
        </Spin>
      </Form>
    );
  }
}
export default Register;
