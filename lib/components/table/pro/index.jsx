/* eslint-disable import/extensions */
/**
 *   table 表格增加版，同时支持以下功能：
 *   1.行编辑
 *   2.行拖拽
 *   3.尾行汇总
 *
 * @class TablePro
 * @extends {Component}
 * @param {string} editId 可编辑唯一id
 * @param {object} summary 汇总数据, key为与columns中相对应的dataIndex, value为汇总值。
 * @param {boolean} drag 是否启动拖拽。
 * @param {function} dragCb 拖拽成功之后的回调，包含两个参数，dragIndex拖拽当前元素的下标, hoverIndex拖拽结束的下标。
 * <TablePro
      editId="id"
      summary={({
        k: '111',
      })}
      drag
      dragCb={(dragIndex, hoverIndex) => {

      }}
      bordered
      columns={this.columns()}
      onChange={fee.onChangePage}
      dataSource={fee.data}
      loading={fee.loadLoading}
      rowKey={(row, i) => i}
      pagination={{
        hideOnSinglePage: true,
        total: fee.total,
        current: fee.pagination.page,
      }}
    />
 * columns中加入相关参数，需要编辑的单元格：
 * @param {reactnode|function} editEl 编辑状态的组件  必填
 * @param {function} editInitVal 编辑状态组件初始化数据的数据  默认: 对应dataindex值
 * @param {array} editRules 编辑时的校验规则 默认: []
 * @param {function} onSave 拥有该字段的列会在render中自动增加【编辑】按钮，values 表单校验后的参数，id 为当前行唯一标示
 * @param {string} summaryIcon 前缀图标，默认iconSum，可选iconSum
 * @param {function} summaryFormat 对汇总数据进行格式化
 * {
      editEl: <Input />,
      editInitValFn: (text, row) => {},
      editRules: [
        {
          required: true,
          message: '请输入首重金额！',
        },
        {
          pattern: /^\d+$/,
          message: '首重金额必须为整数',
        },
      ],
      onSave: (values, id) => { // 保存时的操作，values 表单校验后的参数，id 为当前行唯一标示  必填
        console.log(values, id);
      },
      summaryIcon: 'iconAvg'
      summaryFormat: (data) => data,
 * }
 */

import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Pagination } from 'antd';
import List from '../index';
import Edit from './edit.jsx'
import Summary from './summary.jsx'
import Drag from './drag.jsx'

const EXTENDS_CLASS = {
  EDIT: 'Edit',
  SUMMARY: 'Summary',
  DRAG: 'Drag',
}

const getBaseName = (isEdit, isSummary, isDrag) => {
  const temp = {};
  if (isEdit) {
    temp[EXTENDS_CLASS.EDIT] = Edit;
  }
  if (isSummary) {
    temp[EXTENDS_CLASS.SUMMARY] = Summary;
  }
  if (isDrag) {
    temp[EXTENDS_CLASS.DRAG] = Drag;
  }
  return temp;
}

const TablePro = (props) => {

  const { editId, summary = {}, drag } = props;
  // 根据传入的参数，动态继承编辑，汇总，拖拽类
  const BaseName = getBaseName(!!editId, !!Object.keys(summary).length, drag);
  const Base = Object.entries(BaseName)
  .map(([, v]) => v)
  .reduce((acc, cur) => cur(acc), Component)

  class Instance extends Base {
    constructor(props) {
      super(props);
    }
    render() {
      const components = {
        body: {
          ...this.editComponents,
          ...this.DropComponents,
          ...this.summaryComponents,
        }
      };

      const { columns, editId, drag, dragCb = () => {}, ...restProps } = this.props;

      const resColumns = editId ? this.dealCols(columns, editId) : columns;

      const onRow = (record, index) => {
        let old = restProps.onRow ? restProps.onRow(record, index) : {};
        const res = {};
        if (drag) {
          res.moveRow = dragCb;
        }
        return {
          ...old,
          index,
          ...res,
        }
      }

      return <List
        {...restProps}
        components={components}
        onRow={onRow}
        columns={resColumns}
      />;
    }
  }

  let dataSource = props.dataSource;
  let page = {
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    onChange: props.onChangePage,
    onShowSizeChange: (current, size) => {
      props.onChangePage(current, size);
      dataSource = dataSource.slice(0, size)
    },
    showTotal: total => `共 ${total} 条`,
    ...props.pagination
  };

  if (BaseName[EXTENDS_CLASS.DRAG]) {
    const DragInstance = DragDropContext(HTML5Backend)(Instance);
    // return <DragInstance {...props} />
    return (
      <>
        <DragInstance {...props} dataSource={dataSource} pagination={false} />
        {props.pagination && <Pagination className='ant-table-pagination' {...page}/>}
      </>
    )
  }
  return (
    <>
      <Instance {...props} dataSource={dataSource} pagination={false} />
      {props.pagination && <Pagination className='ant-table-pagination' {...page}/>}
    </>
  )
}

export default TablePro;


