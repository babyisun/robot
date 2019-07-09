import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Popconfirm } from 'antd';
import ListHead from '@/components/Common/ListHead';
import Filter from '#/components/form/filter';
import Table from '#/components/table';
import DateSelect from '#/components/date';
import { createDate, createTag } from '#/utils/createDom';
import { LastWeek } from '#/utils/time';
import { STATUS } from '@/utils/const';
import { formatForm } from '#/utils/format';

@observer
class Robot extends Component {
  componentDidMount() {
    const { robot } = this.props;
    robot.load();
  }

  // 查询项
  fields = () => {
    return [
      {
        label: '注册日期',
        value: 'time',
        el: <DateSelect limit />,
        option: {
          initialValue: LastWeek,
        },
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
      render: (value, row) => {
        const { robot } = this.props;
        return (
          <Popconfirm
            title="确定删除?"
            onConfirm={() => {
              robot.add(row);
            }}
          >
            <a>删除</a>
          </Popconfirm>
        );
      },
    },
  ];

  formatParams = v => {
    return formatForm(v, [{ from: 'time', to: ['start_time', 'end_time'], type: 'time' }]);
  };

  render() {
    const { robot } = this.props;
    return (
      <Card>
        <ListHead />
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
