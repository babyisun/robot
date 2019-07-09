import React from 'react';
import { Tooltip, Icon } from 'antd';
import { isNull } from '#/utils/format';
import styles from '../index.scss';

const EMPTY_ICON = '--'; // 空占位符
const QUESTION_ICON_STYLE = { color: 'var(--primary-color)', fontSize: 18, cursor: 'pointer' };

const createLabel = (s = 'iconSum') => (<span className={styles[s]} />);

const getAllDataIndex = (columns) => {
  const temp = [];
  columns.forEach(item => {
    if (Array.isArray(item.children)) {
      temp.push(...getAllDataIndex(item.children));
      return;
    }
    temp.push({
      ...item,
    });
  });
  return temp;
};

const generateWrapper = ({ summary, columns, dataSource }, arg) => {
  // 重写表格时，Wrapper会被调用两次，第一次为普通表格，第二次为当表格fixed固定区域时,
  // 但是目前无法通过传入的wrapperProps来区分表格是哪个表格，所以暂时只能通过判断调用的顺序来判断
  let count = 0;
  const Wrapper = ({ ...wrapperProps }) => {
    const { children } = wrapperProps;

    if (dataSource && dataSource.length && summary && Object.keys(summary).length) {
      children.push(
        <tr style={{ backgroundColor: '#fafafa' }} key="-1">
          {
            getAllDataIndex(columns).map(({ dataIndex, fixed, summaryFormat, summaryIcon = 'iconSum' }, idx) => {
              const val = summaryFormat
                ? summaryFormat(summary[dataIndex])
                : (isNull(summary[dataIndex]) ? EMPTY_ICON : summary[dataIndex]);

              let dom = null;
              switch (count) {
                case 0: // 渲染普通表格
                  dom = (
                    <td className={fixed ? 'ant-table-fixed-columns-in-body' : ''} key={idx}>
                      {idx === 0 ? null : val !== EMPTY_ICON && createLabel(summaryIcon)}
                      {idx === 0
                        ? (
                          <Tooltip placement="bottomLeft" title="汇总包含未展示的分页数据">
                            <Icon type="question-circle" style={QUESTION_ICON_STYLE} />
                            {' '}
                            <span className="summaryTd">汇总</span>
                          </Tooltip>
                        )
                        : val}
                    </td>
                  );
                  break;
                case 1: // 渲染fixed固定的表格
                  dom = fixed ? (
                    <td key={idx}>
                      {idx === 0 ? null : val !== EMPTY_ICON && createLabel(summaryIcon)}
                      {idx === 0
                        ? (
                          <Tooltip placement="bottomLeft" title="汇总包含未展示的分页数据">
                            <Icon type="question-circle" style={QUESTION_ICON_STYLE} />
                            {' '}
                            <span className="summaryTd">汇总</span>
                          </Tooltip>
                        )
                        : val}
                    </td>
                  ) : null;
                  break;
                default:
                  break;
              }
              return dom;
            })
          }
        </tr>,
      );
      count += 1;
    }

    return <tbody {...wrapperProps}>{children}</tbody>;
  };
  return Wrapper(arg);
};

const Summary = (base = class {}) => class extends base {
  constructor(props) {
    super(props);
    this.summaryComponents = {
      wrapper: (arg) => generateWrapper(this.props, arg),
    }
  }


}

export default Summary;
