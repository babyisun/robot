import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Input, Popconfirm, Divider } from 'antd';
import { createTag, createDate, createSelect } from '#/utils/createDom';
import List from '#/components/table';
import DateSelect from '#/components/date';
import Filter from '#/components/form/filter';
import ListHead from '@/components/Common/ListHead';
import { formatForm } from '#/utils/format';
import { STATUS, MSG_TYPE } from '@/utils/const';

@observer
class Task extends Component {
  componentDidMount() {
    const { task } = this.props;
    task.load();
  }

  updateStatus(pass_uid, status) {
    const { task } = this.props;
    const param = { pass_uid, status };
    task.submit(param);
  }

  // 查询项
  fields = () => [
    {
      label: '任务名',
      value: 'name',
      el: <Input placeholder="请输入任务名" />,
    },
    {
      label: '时间',
      value: 'time',
      el: <DateSelect />,
    },
    {
      label: '类型',
      value: 'msgtype',
      el: createSelect(MSG_TYPE.DATA),
    },
  ];

  // 列表项目
  columns = () => [
    {
      title: '任务名',
      dataIndex: 'name',
    },
    {
      title: '消息类型',
      dataIndex: 'msgtype',
      render: v => createTag(MSG_TYPE, v),
    },
    {
      title: '计划',
      dataIndex: 'corn',
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: v => createDate(v, 'time'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: value => createTag(STATUS, value),
    },
    {
      title: '操作',
      render: (v, r) => {
        return (
          <>
            <Link to={{ pathname: `/task/detail/${r.objectId}` }}>查看</Link>
            <Divider type="vertical" />
            <Popconfirm
              title={`确定要${STATUS.BTN[r.status]}该账号吗?`}
              onConfirm={() => this.updateStatus(r.pass_uid, STATUS.BTN[r.status])}
            >
              <a>{STATUS.BTN[r.status]}</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  formatParams = v =>
    formatForm(v, [{ from: 'time', to: ['start_time', 'end_time'], type: 'time' }]);

  render() {
    const { task, history } = this.props;
    return (
      <Card>
        <ListHead btn="添加任务" onCreate={() => history.push({ pathname: `/task/Create` })} />
        <Filter fields={this.fields()} formatParams={this.formatParams} onSearch={task.onSearch} />
        <List
          columns={this.columns()}
          dataSource={task.data}
          loading={task.loadLoading}
          onChangePage={task.onChangePage}
          pagination={{
            total: task.total,
            current: task.pagination.page,
          }}
        />
      </Card>
    );
  }
}

export default Task;
