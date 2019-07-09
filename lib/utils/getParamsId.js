/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 * 获取路由全部参数
 * @param {objec} 组件 props 参数对象
 * @return {object} 返回值
 */
const getParams = props => {
  if (!props || !props.match) {
    console.error('props is invalid.');
    return;
  }
  const { match: { params } } = props;
  // eslint-disable-next-line consistent-return
  return params;
};

/**
 * 获取路由ID参数
 * @param {objec} 组件 props 参数对象
 * @return {string} 返回id
 */
const getParamsId = props => getParams(props).id;

/**
 * 比较俩次路由是否一致
 * @return {boolean} 返回 true或false
 */
const compare = (next, curr) => {
  const {
    location: {
      pathname: n,
    },
  } = next;
  const {
    location: {
      pathname: c,
    },
  } = curr;
  return n !== c;
};

const queryParams = (data, isPrefix = true) => {
  const prefix = isPrefix ? '?' : '';
  const result = [];
  for (const key in data) {
    const value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (value.constructor === Array) {
      value.forEach(val => {
        result.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`);
      });
    } else {
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return result.length ? prefix + result.join('&') : '';
};

export { getParams, getParamsId, compare, queryParams };
