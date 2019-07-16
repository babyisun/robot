import React, { Component, Fragment } from 'react';
import { Input } from 'antd';
import t from 'prop-types';
import styles from './index.scss';

const { TextArea } = Input;

class CountInput extends Component {
  static propTypes = {
    /**
      输入数量限制
    */
    count: t.number,
    /**
      带计数器输入框的类型
    */
    type: t.oneOf(['input', 'textarea']),
  };

  static defaultProps = {
    count: 20,
    type: 'input',
  };

  state = {
    currentCounts: 0,
    val: '',
    contentPaddingW: 0,
    contentPaddingH: 0,
  };

  componentDidMount() {
    this.setState({
      contentPaddingW: this.computePaddingW(this.counts),
      contentPaddingH: this.computePaddingH(this.counts),
      val: this.props.value,
      currentCounts: this.props.value ? this.props.value.length : 0,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.setState({
        val: nextProps.value,
        currentCounts: nextProps.value ? nextProps.value.length : 0,
      });
    }
  }

  computePaddingW = (el) => {
    const parentW = el.offsetParent.offsetWidth;
    const elW = el.offsetWidth;
    const elL = el.offsetLeft;
    return parentW - elW - elL + elW + 20;
  };

  computePaddingH = (el) => el.offsetHeight + 10;

  inputChange = (e) => {
    const len = e.target.value.length;
    const { onChange, count = 20 } = this.props;
    if (len > count) return;
    this.setState({
      currentCounts: len,
      val: e.target.value,
    });
    if (onChange) {
      onChange(e.target.value);
    }
  };

  createInput = () => {
    const { count, type, onChange, value, ...args } = this.props;
    const { currentCounts, contentPaddingW, val } = this.state;

    return (
      <Fragment>
        <Input
          className="forestInput"
          style={{ paddingRight: contentPaddingW }}
          value={val}
          onChange={this.inputChange}
          {...args}
        />
        <div
          ref={(el) => (this.counts = el)}
          className={`counts ${type === 'input' ? `input` : `textarea`}`}
        >
          <span>{currentCounts}</span>
          <span>/{count}</span>
        </div>
      </Fragment>
    );
  };

  createTextarea = () => {
    const { count, type, onChange, value, ...args } = this.props;
    const { currentCounts, contentPaddingH, val } = this.state;
    return (
      <div className="textareaContainer">
        <TextArea
          className="textareael"
          value={val}
          onChange={this.inputChange}
          // autosize
          style={{ paddingBottom: contentPaddingH }}
          {...args}
        />
        <div
          ref={el => (this.counts = el)}
          className={`counts ${type === 'input' ? `input` : `textarea`}`}
        >
          <span>{currentCounts}</span>
          <span>/{count}</span>
        </div>
      </div>
    );
  };

  render() {
    const { type } = this.props;
    return (
      <div className={styles.countInput}>
        {type === 'input' ? this.createInput() : this.createTextarea()}
      </div>
    );
  }
}

export default CountInput;
