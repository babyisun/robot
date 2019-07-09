// 电话
export const R_TEL = /^1\d{10}$/;
// 字母数字
export const R_WORD_NUMBER = /^[a-zA-Z\d]+$/;

// 数字
export const R_NUMBER = /^[\d]+$/;

// 最多俩位小数数字
// export const R_NUMBER_2 = /^([1-9]\d*|0)(\.\d{1,2})?$/;
export const R_NUMBER_2 = /^([1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/;
// 字母
export const R_WORD = /^[a-zA-Z]+$/;
// 姓名 2-5个汉字
export const R_NAME = /^[\u4e00-\u9fa5]{2,5}$/;
// 邮箱
export const R_EMAIL = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

// 至少6个字符，至少1个字母，1个数字：
export const R_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/;