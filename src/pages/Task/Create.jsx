import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Row, Col } from 'antd';
import { getParamsId } from '#/utils/getParamsId';
// import { createSelectByData } from '#/utils/createDom';
import Items from '#/components/form/items';
import Btn from '#/components/form/button';
import ListHead from '@/components/Common/ListHead';
import { R_TEL } from '#/utils/pattern';

@observer
class Create extends Component {
  componentDidMount() {
    // 加载数据
    const { account } = this.props;
    const id = getParamsId(this.props);
    account.getDetail(id);
  }

  componentWillUnmount(){
    const { account } = this.props;
    account.clearDetail();
  }

  // 查询项
  fields = () => {
    const id = getParamsId(this.props);
    const { account } = this.props;
    const { formData } = account;
    return [
      {
        label: '姓名',
        value: 'name',
        el: <Input placeholder="请输入真实姓名" />,
        // span: 24,
        option: {
          initialValue: formData.name || '',
          validateFirst: true,
          rules: [
            { required: true, message: '请输入姓名', whitespace: true },
            { min: 2, max: 5, message: '姓名为2~5个字符组成' },
          ],
        },
      },
      {
        label: '手机号',
        value: 'phone',
        el: <Input disabled={!!id} placeholder="请输入11位手机号码" />,
        // span: 12,
        option: {
          initialValue: formData.phone,
          rules: [
            { required: true, message: '请输入手机号码', whitespace: true },
            {
              pattern: R_TEL,
              message: '请输入正确的手机号',
            },
          ],
        },
      },
    ];
  };

  onSubmit = () => {
    const {
      account,
      history,
      form: { validateFields },
    } = this.props;
    const id = getParamsId(this.props);
    validateFields((err, values) => {
      if (!err) {
        const params = { pass_uid: id, ...values };
        account.submit(params, () => {
          history.goBack();
        });
      }
    });
  };

  render() {
    const { account, form, history } = this.props;
    return (
      <Card bordered={false}>
        <ListHead />
        <Card loading={account.getDetailLoading}>
          <Row type="flex" justify="center">
            <Col span={24}>
              <Form onSubmit={this.onSubmit}>
                <Items data={this.fields(account.formData)} form={form} />
                <Row gutter={24}>
                  <Col span={24}>
                    <Btn
                      onSubmit={this.onSubmit}
                      loading={account.submitLoading}
                      history={history}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Card>
    );
  }
}

export default Form.create()(Create);
