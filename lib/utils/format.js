/**
 * 判断一个值是否为空
 * @param {*} value
 */
export const isNull = value => value === undefined || value === null || value === '';
/**
 * 删除空字字段，格式化前后空格
 * @param {*} value
 */
export const clearNull = values => {
  Object.entries(values).forEach(([key, val]) => {
    // 删除空字段
    if (isNull(val)) delete values[key];
    // 去除前后空格
    if (typeof val === "string" && val.length) {
      values[key] = val.trim();
    }
  });
  return values;
}

/**
 * 格式化价格
 * @param {number} price 以分为单位的价格
 * @param {string|boolean} unit 是否带单位 默认 true 例子：formatPrice(1002) 返回 ¥10.02
 * @return {string} 以元为单位的价格
 */
export const formatPrice = (price, unit = true) => {
  if (isNull(price)) return '--';
  if (typeof unit === 'string') {
    return (price / 100).toFixed(2) + unit;
  }
  if (typeof unit === 'boolean' && unit) {
    return `¥${(price / 100).toFixed(2)}`;
  }
  return (price / 100).toFixed(2);
};

/**
 * 毫秒时间戳 转 秒时间戳
 * @param {number} time 毫秒时间戳
 * @return {string} 秒时间戳
 */
export const formatTime = time => {
  // eslint-disable-next-line no-underscore-dangle
  if (typeof time === 'object' && time._isAMomentObject) {
    return time.unix();
  }
  return ~~(+time / 1000);
};

/**
 * 数据格式化
 * @param {string} values 待格式化的表单值
 * @param {object} options 格式化配置数组
 *        如：[
 *            {from: 'field1', to: 'field2'},
 *            {from: 'time', to: ['start_time','end_time'], type: 'time'},
 *            {from: 'location', to:['province','city','county'], type: 'number'},
 *           ]
 *        注：
 *        默认不转换类型
 *        如传time，类型需为moment，转换为秒级时间戳
 *        如传number，转换为数值型
 * @return {object}
 *     返回值：{
 *            field2: 'xxx',
 *            start_time: 1556520195,
 *            end_time: 1556520195,
 *            province: 10000,
 *            city: 101000,
 *            county: 101010,
 *           }
 */
export const formatForm = (values, options) => {
  if (values && options && options.length) {
    try {
      options.forEach(v => {
        if (v.from && v.to) {
          if (!values[v.from]) {
            return;
          }
          if (!['time', 'number', undefined].includes(v.type)) {
            console.error('type仅支持：', 'time或number');
            return;
          }
          if (v.to instanceof Array && v.to.length) {
            if (v.type === 'time') {
              v.to.forEach((key, i) => {
                values[key] = values[v.from][i]
                  ? values[v.from][i][i === 0 ? 'startOf' : 'endOf']('d').unix()
                  : null;
              });
            } else if (v.type === 'number') {
              v.to.forEach((key, i) => {
                values[key] = values[v.from][i] ? +values[v.from][i] : null;
              });
            } else {
              v.to.forEach((key, i) => {
                values[key] = values[v.from][i] ? values[v.from][i] : null;
              });
            }
            delete values[v.from];
          } else if (typeof v.to === 'string') {
            if (v.type === 'time') {
              values[v.to] = values[v.from].unix();
            } else if (v.type === 'number') {
              values[v.to] = +values[v.from];
            } else {
              values[v.to] = values[v.from];
            }
            delete values[v.from];
          } else {
            console.error('参数错误:', v);
          }
        } else {
          console.error(
            '参数未找到，正确options示例:',
            `
          [
          {from: 'field1', to: 'field2'},
          {from: 'time', to: ['start_time','end_time'], type: 'time'},
          {from: 'location', to:['province','city','county'], type: 'number'},
          ]
          注：
          默认不转换类型
          如传time，类型需为moment，转换为秒级时间戳
          如传number，转换为数值型
          `,
          );
        }
      });
    } catch (e) {
      console.error(e);
      // throw new Error(e.toString());
    }
  }
  console.log('format', values);
  return values;
};
