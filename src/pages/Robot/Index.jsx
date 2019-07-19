import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Popconfirm, Input, Divider } from 'antd';
import ListHead from '@/components/Common/ListHead';
import Filter from '#/components/form/filter';
import Table from '#/components/table';
// import DateSelect from '#/components/date';
import { createDate, createTag } from '#/utils/createDom';
// import { LastWeek } from '#/utils/time';
import { STATUS } from '@/utils/const';
import { formatForm } from '#/utils/format';

@observer
class Robot extends Component {
  componentDidMount() {
    const { robot, base } = this.props;
    robot.bindUser(base.bs.user);
    robot.load();
  }

  // 查询项
  fields = () => {
    return [
      {
        label: '机器人名',
        value: 'name',
        el: <Input placeholder="你的机器人叫什么" />,
      },
    ];
  };

  // 列表项目
  columns = () => [
    {
      title: '群名',
      dataIndex: 'groupName',
    },
    {
      title: '机器人名',
      dataIndex: 'name',
    },
    {
      title: 'Key',
      dataIndex: 'key',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: v => createTag(STATUS, v),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: v => createDate(v, 'time'),
    },
    {
      title: '操作',
      render: (v, r) => {
        const { robot } = this.props;
        // console.log(r, 999);
        return (
          <>
            <Link to={`/task/Create/${r.objectId}`}>创建任务</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除?"
              onConfirm={() => {
                robot.add(r);
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  formatParams = v => {
    return formatForm(v, [{ from: 'time', to: ['start_time', 'end_time'], type: 'time' }]);
  };

  render() {
    const { robot, history } = this.props;
    return (
      <Card>
        <ListHead btn="添加机器人" onCreate={() => history.push({ pathname: `/robot/create` })} />
        <Filter
          fields={this.fields()}
          onSearch={val => robot.onSearch(val)}
          formatParams={this.formatParams}
        />
        <Table
          columns={this.columns()}
          dataSource={robot.data}
          loading={robot.loadLoading}
          onChangePage={robot.onChangePage}
          pagination={{
            total: robot.total,
            current: robot.pagination.page,
          }}
        />
      </Card>
    );
  }
}

export default Robot;
