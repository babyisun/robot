// 日期选择插件
/*
 day：限制最大选择多少天，默认为90天
 limit： 限制最大日期是否只能选择到今天，false则不限制，默认不限制
 ranges：在某个组件内自定义的将ranges更改为自己需要展示的数据
*/
import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import { Ranges } from '../../utils/time';


const { RangePicker } = DatePicker;
// const ranges = {
//   '最近3天': Last3Days,
//   '最近7天': LastWeek,
//   '最近1个月': LastMonth,
// };
class DateSelect extends Component {
  static defaultProps = {
    day: 90, // 默认限制前后90天
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      // value: props.value,
    };
  }

  disabledDate = current => {
    const { startDate, endDate } = this.state;
    const { limit } = this.props;
    if (limit && current > moment().endOf('day')) {
      return true;
    }
    if (startDate && endDate) {
      return current > startDate || current < endDate;
    }
    return false;
  };

  onCalendarChange = value => {
    const { day } = this.props;
    // console.log(value, this.props);
    if (value.length === 1) {
      this.setState({
        startDate: moment(value[0])
          .add(day, 'days')
          .startOf('day'),
        endDate: moment(value[0])
          .add(-day, 'days')
          .endOf('day'),
      });
    }
    // if (value.length === 2) {
    //   this.setState({ startDate: null, endDate: null });
    // }
  };

  onOpenChange = open => {
    !open && this.setState({ startDate: null, endDate: null });
  };

  onChange = value => {
    this.triggerChange(value);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { day } = this.props;
    return (
      <RangePicker
        ranges={Ranges}
        {...this.props}
        allowClear={false}
        disabledDate={day ? this.disabledDate : null}
        onOpenChange={this.onOpenChange}
        onCalendarChange={this.onCalendarChange}
        onChange={this.onChange}
        // value={this.state.value}
        // format="YYYY-MM-DD"
        getCalendarContainer={n => n.parentNode}
      />
    );
  }
}
export default DateSelect;
