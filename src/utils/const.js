export const LAYOUT = {
  // 不需要头尾的页面
  NotNeedHF: ['login', 'reset'],
  // 存在fixed的表格页面
  FIXED_PAGE: [''],
};

// 数据状态
export const STATUS = {
  DEFINE: {
    DELETE: -1, // 删除,
    OFF: 0, // 禁用
    ON: 1, // 正常
  },
  DATA: {
    [-1]: '删除',
    0: '禁用',
    1: '正常',
  },
  COLOR: {
    0: 'red',
    1: 'green',
  },
};

export const ERRNO = {
  SUCCESS: 0,
};

// 账号状态
export const USER_STATUS = {
  DEFINE: {
    ON: 1,
    OFF: 0,
  },
  DATA: {
    1: '启用',
    0: '禁用',
  },
  COLOR: {
    1: 'green',
    0: 'red',
  },
};

// 角色
export const ROLE = {
  21: '负责人',
  22: '员工'
};


// 支付方式
export const PAY_METHOD = {
  DEFINE: {
    UNDERLINE: 0,
    WECHAT: 1,
    ALIPAY: 2,
  },
  DATA: {
    0: '线下支付',
    1: '微信支付',
    2: '支付宝支付',
  },
};

// 性别
export const GENDER = {
  DEFINE: {
    UNKNOW: 0,
    MALE: 1,
    FEMALE: 2,
  },
  DATA: {
    1: 'male',
    2: 'female',
  },
  TIP: {
    1: '男',
    2: '女',
  },
  COLOR: {
    1: '#6ab0e8',
    2: '#ff36c2',
  },
};
