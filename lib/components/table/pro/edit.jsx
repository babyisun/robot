import React, { Component } from 'react';
import { Form, Popconfirm } from 'antd';
import { isNull } from '#/utils/format';

const FormItem = Form.Item;
const { Provider, Consumer } = React.createContext();

export { React, Provider }

const EMPTY_ICON = '--'; // 空占位符

const rewriteRuleValidate = (rules, form) => rules.map(rule => {
  if (!rule.validator) {
    return rule;
  }
  return {
    ...rule,
    validator(...arg) {
      rule.validator(...arg, form);
    },
  };
});

/* 重写render方法，如果返回值无效，则返回-- */
const dealInvalid = (render) => {
    const _render = render || ((text) => text);
    return function(text, row, index) {
      const res = _render(text, row, index);
      return isNull(res) ? EMPTY_ICON : res;
    }
};

const Row = ({ form, index, ...props }) => (
  <Provider value={form}>
    <tr {...props} />
  </Provider>
);
const FormRow = Form.create()(Row);

const Cell = (props) => {
  const { isEditing, dataIndex, editInitVal, record, index, editEl, editRules, ...restProps } = props;
  return (
    <Consumer>
      {form => {
        const { getFieldDecorator } = form;
        return (
          <td {...restProps}>
            {isEditing ? (
              <FormItem style={{ margin: 0 }}>
                {getFieldDecorator(dataIndex, {
                  rules: rewriteRuleValidate(editRules, form),
                  initialValue: editInitVal(record[dataIndex], record),
                  validateFirst: true,
                })(typeof editEl === 'function' ? editEl(record, form) : editEl)}
              </FormItem>
            ) : (
              restProps.children
            )}
          </td>
        );
      }}
    </Consumer>
  );
}

const Edit = (base = class {}) => class extends base {
  constructor(props) {
    super(props);
    this.state = { editingKey: '' };
    this.editComponents = {
      row: FormRow,
      cell: Cell,
    }
  }
  // 判断当前行是不是编辑状态
  isEditing = key => key === this.state.editingKey;
  // 释放编辑状态
  cancel = () => {
    this.setState({ editingKey: '' });
  };
  // 数据校验通过后，执行对应的回调函数，在释放编辑状态，ps: 回调函数如果是异步函数，主要执行顺序
  save(form, key, fn) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      fn(row, key);
      this.setState({ editingKey: '' });
    });
  }
  // 将对应行设置为可编辑状态
  edit(key) {
    this.setState({ editingKey: key });
  }
  // 对原列数据进行处理
  dealCols(columns, editId) {
    return columns.map(col => {
      const { children, editEl, onSave, dataIndex, editRules = [], editInitVal = val => val } = col;
      if (children) { // 如果存合并字段，递归处理
        return {
          ...col,
          children: this.dealCols(children, editId),
        }
      }

      col.render = dealInvalid(col.render); // 无效的值展示为 --

      if (!editEl && !onSave) { // 既不是可编辑，也不是操作项
        return col;
      }

      if (onSave) { // 如果是操作项
        return {
          ...col,
          render: (text, record) => {
            const editable = this.isEditing(record[editId]);
            return (
              <div>
                <span style={{ marginRight: 8 }}>
                  {editable ? (
                    <span>
                      <Consumer>
                        {form => (
                          <Popconfirm
                            title="您确定保存修改吗?"
                            onConfirm={() => this.save(form, record[editId], onSave)}
                          >
                            <a style={{ marginRight: 8 }}>保存</a>
                          </Popconfirm>
                        )}
                      </Consumer>
                      <a onClick={() => this.cancel()}>取消</a>
                    </span>
                  ) : (
                    <a onClick={() => this.edit(record[editId])}>编辑</a>
                  )}
                </span>
                {!editable ? (col.render ? col.render(text, record) : text) : null}
              </div>
            );
          },
        };
      }

      return { // 可编辑项
        ...col,
        onCell: record => ({
          record,
          dataIndex,
          editRules,
          isEditing: this.isEditing(record[editId]),
          editEl,
          editInitVal,
        }),
      }

    });
  }

}

export default Edit;
