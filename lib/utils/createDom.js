import React from 'react';
import { Link } from 'react-router-dom';
import { Select, InputNumber, Icon, Tag } from 'antd';
import moment from 'moment';
import { formatPrice, isNull } from './format';
import { queryParams } from './getParamsId';

const { Option } = Select;

/**
 * 创建枚举类型select框
 *
 * data - const里的枚举类型
 * opts - 配置项
 */
export const createSelect = (data, opts = { isAll: true, selectProps: {} }, noLoadContainer) => (
  <Select
    placeholder="请选择"
    {...opts.selectProps}
    style={{ width: opts.width }}
    getPopupContainer={noLoadContainer ? () => document.body : n => n.parentNode}
  >
    {opts.isAll && (
      <Option key="-1" value="">
        全部
      </Option>
    )}
    {Object.entries(data).map(([k, v]) => (
      <Option key={k} value={k}>
        {v}
      </Option>
    ))}
  </Select>
);
/**
 * 创建接口类型select框
 *
 * data - 接口返回值
 * opts - 配置项
 */
export const createSelectByData = (data, opts = {}, noLoadContainer) => {
  const filterOptionFn = (v, o) => {
    const { props } = o;
    if (opts.filterWithValue && `${props.value}`.toUpperCase().includes(v.toUpperCase())) {
      return true;
    }
    if (`${props.children}`.toUpperCase().includes(v.toUpperCase())) {
      return true;
    }
    return false;
  };
  let { selectProps, search } = opts;
  if (search) {
    selectProps = { ...{ showSearch: true, filterOption: filterOptionFn }, ...selectProps };
  }
  const options = { ...{ isAll: true, name: 'name', value: 'value' }, ...opts };
  return (
    <Select
      placeholder="请选择"
      {...selectProps}
      style={{ width: options.width }}
      getPopupContainer={noLoadContainer ? () => document.body : n => n.parentNode}
    >
      {options.isAll && (
        <Option key="-1" value="">
          全部
        </Option>
      )}
      {data &&
        data.map(item => (
          <Option key={item[options.value]} value={item[options.value]}>
            {item[options.name]}
          </Option>
        ))}
    </Select>
  );
};

/**
 * 创建枚举类型展示span
 *
 * opts - const里的枚举类型
 * value - 当前值
 */
export const createSpan = (opts, value) => {
  if (!isNull(value)) {
    if (opts.DATA) {
      return <span className={opts.COLOR ? opts.COLOR[value] : null}>{opts.DATA[value]}</span>;
    }
    if (opts.color) {
      return <span className={opts.color}>{value}</span>;
    }
    return <span>{opts[value]}</span>;
  } 
    return null;
  
};

/**
 * 创建枚举类型展示span
 *
 * opts - const里的枚举类型
 * value - 当前值
 */
export const createTag = (opts, value) => {
  if (!isNull(value)) {
    if (opts.DATA) {
      return <Tag color={opts.COLOR ? opts.COLOR[value] : null}>{opts.DATA[value]}</Tag>;
    }
    if (opts.color) {
      return <Tag color={opts.color}>{value}</Tag>;
    }
    return <Tag>{opts[value]}</Tag>;
  } 
    return null;
  
};

/**
 * 创建枚举类型对应图标
 *
 * opts - const里的枚举类型 如：
 * onst SCAN_TYPE = {
    DATA: {
      0: '否',
      1: '是',
    },
    ICON: {
      0: 'close-circle',
      1: 'check-circle',
    },
    COLOR: {
      0: 'red',
      1: 'green',
    },
  };
 * value - 当前值
 * size - 图标大小，默认20
 */
export const createIcon = (opts, value, size = 20) => {
  if (opts.ICON) {
    const style = { fontSize: size };
    if (opts.COLOR) {
      style.color = opts.COLOR[value];
    }
    return <Icon type={opts.ICON[value]} style={style} />;
  }
  return value;
};

/**
 * 创建价格选择输入框
 */
export const createPrice = opts => {
  const options = { ...{ style: { /* height: 31, */ width: 110 } }, ...opts };
  return (
    <InputNumber
      style={options.style}
      min={0}
      placeholder="输入金额"
      // formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      // parser={value => value.replace(/\$\s?|(,*)/g, '')}
    />
  );
};
const COLOR = { '+': 'green', '-': 'red' };
export const createNumber = (value, color) => {
  // 返回以分为单位，正数为绿色，负数为红色
  let c = '';
  if (!color) {
    value > 0 ? (c = 'green') : !value ? (c = '#666') : (c = 'red');
  } else {
    c = color.length > 1 ? color : COLOR[color];
  }
  const number = formatPrice(value, true);
  return createSpan({ color: c }, number);
};

/**
 * 创建百分比选择框
 */
export const createPercent = opts => {
  const options = { ...{ style: { height: 31, width: 110 } }, ...opts };
  return (
    <InputNumber
      style={options.style}
      min={0}
      max={100}
      placeholder="输入百分比"
      // formatter={value => `${value}%`}
      // parser={value => value.replace('%', '')}
    />
  );
};

/**
 * 创建react router链接
 *
 * text - 链接名字
 * path - 页面 url路由，区分大小写
 * params - 传递给跳转页面的参数
 * opts - 其它参数：是否在新页面打开，默认为是
 */
export const createLink = (text, path, params, opts) => {
  const options = { ...{ target: false }, ...opts };
  // const u = JSON.stringify(params);
  const u = queryParams(params);
  const props = {};
  if (options.target) {
    props.target = '_blank';
  }
  return (
    <Link {...props} to={{ pathname: `${path}${u}` }}>
      {text}
    </Link>
  );
};

/**
 * 格式化时间
 *
 * time - 时间戳
 * format - 默认 date 日期型， time 日期和时间，也可以传入自定义类型 如：YY-MM-DD
 */
export const createDate = (time, format = 'time') => {
  if (format === 'date') {
    return moment(time).format('YYYY-MM-DD');
  } if (format === 'time') {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(time).format(format);
  }
};
