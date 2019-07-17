import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Row, Col, DatePicker } from 'antd';
import { getParamsId } from '#/utils/getParamsId';
import { createSelect, createRadio } from '#/utils/createDom';
import { MSG_TYPE, TASK_TYPE } from '@/utils/const';
import Items from '#/components/form/items';
import CountInput from '#/components/countInput';
import Btn from '#/components/form/button';
import ListHead from '@/components/Common/ListHead';

@observer
class Create extends Component {
  componentDidMount() {
    // 加载数据
    const { task } = this.props;
    const id = getParamsId(this.props);
    if (id) task.getDetail(id);
  }

  componentWillUnmount() {
    const { task } = this.props;
    task.clear();
  }

  // 查询项
  fields = () => {
    // const id = getParamsId(this.props);
    const { task } = this.props;
    const { formData } = task;
    return [
      {
        label: '任务名',
        value: 'name',
        el: <Input placeholder="请输入任务名" maxLength={20} />,
        option: {
          initialValue: formData.name,
          validateFirst: true,
          rules: [{ required: true, message: '请输入任务名', whitespace: true }],
        },
      },
      {
        label: '类型',
        value: 'msgtype',
        el: createSelect(MSG_TYPE.DATA),
        option: {
          initialValue: formData.msgtype,
          rules: [{ required: true, message: '请输入手机号码', whitespace: true }],
        },
      },
      {
        label: '内容',
        value: 'content',
        el: <CountInput type="textarea" count={100} rows={10} />,
        span: 24,
        option: {
          initialValue: formData.content,
          rules: [{ required: true, message: '发送内容不能为空', whitespace: true }],
        },
      },
      {
        label: '频率',
        value: 'peer',
        el: createRadio(TASK_TYPE.DATA),
        span: 24,
        option: {
          initialValue: formData.peer || '1',
          rules: [{ required: true, message: '请选择频率' }],
        },
      },
      {
        label: '时间',
        value: 'time',
        el: <DatePicker showTime />,
        span: 12,
        option: {
          initialValue: formData.time,
          rules: [{ required: true, message: '请选择时间' }],
        },
      },
    ];
  };

  onSubmit = () => {
    const {
      task,
      history,
      form: { validateFields },
    } = this.props;
    const id = getParamsId(this.props);
    validateFields((err, values) => {
      if (!err) {
        const params = { pass_uid: id, ...values };
        task.submit(params, () => {
          history.goBack();
        });
      }
    });
  };

  render() {
    const { task, form, history } = this.props;
    return (
      <Card bordered={false}>
        <ListHead />
        <Card loading={task.getDetailLoading}>
          <Row type="flex" justify="center">
            <Col span={24}>
              <Form onSubmit={this.onSubmit}>
                <Items data={this.fields(task.formData)} form={form} />
                <Row gutter={24}>
                  <Col span={24}>
                    <Btn
                      onSubmit={this.onSubmit}
                      loading={task.submitLoading}
                      history={history}
                      btns={[
                        {
                          name: '测试发送',
                          fun: () => console.log('test send'),
                        },
                      ]}
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
