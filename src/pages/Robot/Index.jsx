import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Input, Tooltip } from 'antd';
import ListHead from '@/components/Common/ListHead';
import Filter from '#/components/form/filter';
import Table from '#/components/table';
import DateSelect from '#/components/date';
import { createSelect, createDate } from '#/utils/createDom';
import { LastWeek } from '#/utils/time';
import {
  GENDER,
} from '@/utils/const';
import { formatForm } from '#/utils/format';


@observer
class Robot extends Component {
  componentDidMount() {
    const { list } = this.props;
    list.onClearQuery();
    list.load();
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
        }

      },
      {
        label: '手机号',
        value: 'bind_phone',
        el: <Input maxLength={11} placeholder="请输入" />,
      },
      {
        label: '性别',
        value: 'gender',
        el: createSelect(GENDER.TIP),
      },
    ];
  };

  // 列表项目
  columns = () => [
    {
      title: '昵称',
      dataIndex: 'nick_name',
    },
    {
      title: '手机号',
      dataIndex: 'bind_phone',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: v => v > 0 ? (
        <Tooltip title={GENDER.TIP[v]}>
          <i
            className={`iconfont icon-${GENDER.DATA[v]}`}
            style={{ color: GENDER.COLOR[v], fontSize: 16 }}
          />
        </Tooltip>
      ) : '',
    },
    {
      title: '注册时间',
      dataIndex: 'regist_time',
      render: v => createDate(v, 'time'),
    },
    {
      title: '下单量',
      dataIndex: 'order_cnt',
    },
  ];

  formatParams = v => {
    return formatForm(v, [{ from: 'time', to: ['start_time', 'end_time'], type: 'time' }]);
  };

  render() {
    const { list } = this.props;
    return (
      <Card>
        <ListHead />
        <Filter
          fields={this.fields()}
          onSearch={val => list.onSearch(val)}
          formatParams={this.formatParams}
        />
        <Table
          columns={this.columns()}
          dataSource={list.data}
          loading={list.loadLoading}
          onChangePage={list.onChangePage}
          pagination={{
            total: list.total,
            current: list.pagination.page,
          }}
        />
      </Card>
    );
  }
}

export default Robot;
