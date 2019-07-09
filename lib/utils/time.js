import moment from 'moment';

// 今天
const Today = moment();
// 昨天
const Yesterday = moment().subtract(1, 'd');
// 明天
const Tomorrow = moment().add(1, 'd');
// 最近三天
const Last3Days = [moment().subtract(2, 'd').startOf('d'), moment().endOf('d')];
// 最近一周
const LastWeek = [moment().subtract(6, 'd').startOf('d'), moment().endOf('d')];
// 最近一个月
const LastMonth = [moment().subtract(1, 'month').startOf('d'), moment().endOf('d')];
// 最近三个月
const Last3Month = [moment().subtract(3, 'month').startOf('d'), moment().endOf('d')];

// 默认Range
const Ranges = {
  最近3天: Last3Days,
  最近7天: LastWeek,
  最近1个月: LastMonth,
  // 最近3个月: Last3Month,
};


export { Today, Yesterday, Tomorrow, Last3Days, LastWeek, LastMonth, Last3Month, Ranges };
