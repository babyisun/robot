import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Input, Popconfirm, Divider } from 'antd';
import { createTag, createDate } from '#/utils/createDom';
import List from '#/components/table';
import Filter from '#/components/form/filter';
import ListHead from '@/components/Common/ListHead';
import { formatForm } from '#/utils/format';
import { USER_STATUS } from '@/utils/const';
import { Question_Icon } from '@/utils/dom';

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
      label: '姓名',
      value: 'name',
      el: <Input placeholder="请输入姓名" />,
    },
    {
      label: '手机号',
      value: 'phone',
      el: <Input placeholder="请输入手机号" />,
    },
  ];

  // 列表项目
  columns = () => [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'role_name',
    },
    {
      title: '添加日期',
      dataIndex: 'create_time',
      render: v => createDate(v, 'time'),
    },
    {
      title: '更新日期',
      dataIndex: 'update_time',
      render: v => createDate(v, 'time'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: value => createTag(USER_STATUS, value),
    },
    {
      title: '添加人',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      render: (v, r) => {
        const { user } = this.props.base.bs;
        return (
          <>
            <Link to={{ pathname: `/System/Account/Edit/${r.pass_uid}` }}>编辑</Link>
            {user && user.pass_uid !== r.pass_uid && (
              <>
                <Divider type="vertical" />
                <Popconfirm
                  title={`确定要${USER_STATUS.BTN.NAME[r.status]}该账号吗?`}
                  icon={Question_Icon}
                  onConfirm={() =>
                    this.updateStatus(r.pass_uid, USER_STATUS.BTN.VALUE[r.status])
                  }
                >
                  <a>{USER_STATUS.BTN.NAME[r.status]}</a>
                </Popconfirm>
              </>
            )}
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
        <ListHead
          btn="添加任务"
          onCreate={() => history.push({ pathname: `/task/Create` })}
        />
        <Filter
          fields={this.fields()}
          formatParams={this.formatParams}
          onSearch={task.onSearch}
        />
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
