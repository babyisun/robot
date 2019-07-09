/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { Form, Icon, Input, message, Spin, Modal } from "antd";
import styles from "./index.scss";

const FormItem = Form.Item;

@Form.create()
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginLoading: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    // const { form, hideModal, loginUrl = "/#/login" } = this.props;
    const { form } = this.props;
    form.validateFields(
      ["oldPass", "newPass", "confirmNewPass"],
      { force: true },
      (err, values) => {
        if (!err) {
          if (values.newPass !== values.confirmNewPass) {
            message.warn("两次输入的密码不一样");
          } else {
            // const succCallback = () => {
            //   this.setState({ isLoginLoading: false });
            //   // eslint-disable-next-line no-unused-expressions
            //   hideModal && hideModal();
            //   message.success("密码重置成功, 请使用新密码登录", () => {
            //     window.location.replace(loginUrl);
            //   });
            // };
            // const failCallback = res => {
            //   this.setState({ isLoginLoading: false });
            //   if (res.errmsg) {
            //     message.warn(res.errmsg);
            //   }
            // };
            // const invalidSessionCallback = res => {
            //   this.setState({ isLoginLoading: false });
            //   if (res.errmsg) {
            //     message.warn(res.errmsg);
            //   }
            //   window.location.replace(loginUrl);
            // };
          }
        }
      }
    );
  };

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      hideModal
    } = this.props;
    const { isLoginLoading } = this.state;
    const inputPassword = (
      <div>
        <FormItem>
          {getFieldDecorator("oldPass", {
            rules: [{ required: true, message: "请输入原密码" }]
          })(
            <Input
              prefix={<Icon type="lock" theme="filled" />}
              placeholder="请输入原密码"
              type="password"
              size="large"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("newPass", {
            rules: [{ required: true, message: "请确认新密码" }]
          })(
            <Input
              prefix={<Icon type="lock" />}
              placeholder="输入新密码"
              type="password"
              size="large"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("confirmNewPass", {
            rules: [{ required: true, message: "请确认新密码" }]
          })(
            <Input
              prefix={<Icon type="lock" />}
              placeholder="确认新密码"
              type="password"
              size="large"
            />
          )}
        </FormItem>
      </div>
    );

    return (
      <Modal
        className={styles.modalContainer}
        title="修改密码"
        visible={visible}
        // footer={false}
        // width={450}
        onOk={this.handleSubmit}
        onCancel={hideModal}
        destroyOnClose
      >
        <Form onSubmit={this.handleSubmit}>
          <Spin spinning={isLoginLoading}>{inputPassword}</Spin>
        </Form>
      </Modal>
    );
  }
}
export default ChangePassword;
