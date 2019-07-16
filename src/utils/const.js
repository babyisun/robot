export const LAYOUT = {
  // 不需要头尾的页面
  NotNeedHF: ['login', 'reset'],
  // 存在fixed的表格页面
  FIXED_PAGE: [''],
};

export const ERRNO = {
  SUCCESS: 0,
};

// 角色
export const ROLE = {
  ADMIN: 'Admin',
  NORMAL: 'Normal',
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
    1: '启用',
  },
  COLOR: {
    0: 'red',
    1: 'green',
  },
  BTN:{
    0: '启用',
    1: '禁用',
  }
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

// 消息类型
export const MSG_TYPE = {
  DEFINE: {
    TEXT: 1,
    MARKDOWN: 2,
    IMAGE: 3,
    NEWS: 4,
  },
  DATA: {
    1: '文本消息',
    2: '富文本消息',
    3: '图片',
    4: '新闻',
  },
};

// 任务类型
export const TASK_TYPE = {
  DEFINE: {
    SINGLE: 1,
    DAILY: 2,
    WEEKLY: 3,
    YEARLY: 4,
  },
  DATA: {
    1: '单次',
    2: '每日',
    3: '每周',
    4: '每月',
    5: '每年',
  },
};

// 周枚举
export const WEEK = {
  DATA: {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日',
  },
};