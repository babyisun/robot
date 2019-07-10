import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Row, Col } from 'antd';
// import { getParamsId } from '#/utils/getParamsId';
import Items from '#/components/form/items';
import Btn from '#/components/form/button';
import ListHead from '@/components/Common/ListHead';

import images from '@/assets/readme.png';
import styles from './Robot.scss';

@observer
class Create extends Component {
  componentDidMount() {
    // 加载数据
    // const { robot } = this.props;
    // const id = getParamsId(this.props);
    // id && robot.getDetail(id);
  }

  // 表单项
  fields = () => {
    // const { robot } = this.props;
    return [
      {
        label: '机器人名字',
        value: 'name',
        el: <Input placeholder="请输入真实姓名" />,
        // span: 24,
        option: {
          // validateFirst: true,
          // initialValue: formData.name || '',
          rules: [{ required: true, message: '你的机器人叫什么？', whitespace: true }],
        },
      },
      {
        label: '所属群名',
        value: 'groupName',
        el: <Input placeholder="可以填写「公司-群名」" />,
        // span: 12,
        option: {
          rules: [{ required: true, message: '让你的机器人有群所属', whitespace: true }],
        },
      },
      {
        label: '配置链接',
        value: 'url',
        el: <Input placeholder="企业微信机器人中的Webhook地址" />,
        // span: 12,
        option: {
          rules: [
            {
              required: true,
              message: '让你的机器人有群所属',
              whitespace: true,
            },
            {
              // pattern: /qyapi\.weixin\.qq\.com\/.*\bkey\=((?=.*-)[0-9a-z-]{11,})/i,
              pattern: /qyapi\.weixin\.qq\.com\/.*\bkey\=([A-F0-9]{8}(-[A-F0-9]{4}){3}-[A-F0-9]{12})/i,
              message: '请输入正确的配置链接',
            },
            // {
            //   validator: (r, v, callback) => {
            //     // console.log(r, v);
            //     if (v.includes('qyapi.weixin.qq.com') && v.includes('?key=')) {
            //       throw new Error('error message');
            //     }
            //     callback();
            //   },
            //   message: 'xxxxx',
            // },
          ],
        },
      },
    ];
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      robot,
      history,
      form: { validateFields },
    } = this.props;
    // const id = getParamsId(this.props);
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        // const params = { pass_uid: id, ...values };
        robot.submit(values, () => {
          history.goBack();
        });
      }
    });
  };

  render() {
    const { robot, form, history } = this.props;
    return (
      <Card bordered={false}>
        <ListHead />
        <Card>
          <Row type="flex" justify="center">
            <Col span={24}>
              <Form onSubmit={this.onSubmit}>
                <Items data={this.fields(robot.formData)} form={form} />
                <Row gutter={24}>
                  <Col span={24}>
                    <Card title="配置链接(Webhook)获取说明" className={styles.readme}>
                      <img src={images} alt="说明图片" />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Btn loading={robot.submitLoading} history={history} />
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
