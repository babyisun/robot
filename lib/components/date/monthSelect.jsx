import React, { Component } from 'react';
// import moment from 'moment';
import { DatePicker } from 'antd';
import styles from './monthSelect.scss';

const { RangePicker } = DatePicker;

class MonthSelect extends Component {
//   static defaultProps = {
//     day: 90, // 默认限制
//   };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      // startDate: null,
      // endDate: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ value: nextProps.value });
  }

  /* disabledDate = current => {
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      return current > startDate || current < endDate;
    }
    return false;
  };

  onCalendarChange = value => {
    const { day } = this.props;
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
    console.log(value, 'onCalendarChange');
    // if (value.length === 2) {
    //   this.setState({ startDate: null, endDate: null });
    // }
  };

  onOpenChange = open => {
    console.log(open, 'onOpenChange');
    !open && this.setState({ startDate: null, endDate: null });
  }; */

  handlePanelChange = value => {
    this.triggerChange(value);
  }

  onChange = value => {
    console.log(value, 'onChange');
    this.triggerChange(value);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      // console.log('tigger', changedValue);
      onChange(changedValue);
    }
  };

  render() {
    const { value } = this.state;
    return (
      <RangePicker
        className={styles.month}
        {...this.props}
        // disabledDate={this.disabledDate}
        allowClear={false}
        onOpenChange={this.onOpenChange}
        onCalendarChange={this.onCalendarChange}
        onPanelChange={this.handlePanelChange}
        // onChange={this.onChange}
        placeholder={['开始月份', '结束月份']}
        mode={['month', 'month']}
        format="YYYY年MM月"
        value={value}
        showTime
        onOk={null}
        getCalendarContainer={n => n.parentNode}
        // renderExtraFooter={() => (
        //   <Button size="small" type="primary">确定</Button>
        // )}
      />
    );
  }
}
export default MonthSelect;
