/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/*
 * Created by lihao on 2018/4/23.
 * 使用echart生成相应图表
 */

import React, { Component } from 'react';
import eCharts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

const Loading_Option = {
  text: '加载中...',
  color: '#e60500',
  textColor: '#000',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0,
};

export default class Base extends Component {
  componentDidMount() {
    // this.chartDom && eCharts.dispose(this.chartDom);
    if (this.dom) {
      const { option, loading } = this.props;

      this.chartDom = eCharts.init(this.dom);
      if (loading) {
        this.chartDom.showLoading('default', Loading_Option);
      } else {
        this.chartDom.hideLoading();
      }
      // 因为渲染的速度问题，因此此模块需要延迟渲染
      window.addEventListener('resize', () => this.chartDom && this.chartDom.resize());
      this.chartDom.setOption(option);
    }
  }

  componentWillReceiveProps(nextProps) {
    // 若dom存在且刷新后的type不同，重新拉取数据
    // this.chartDom && eCharts.dispose(this.chartDom);
    // this.chartDom = eCharts.init(this.dom);
    // 因为渲染的速度问题，因此此模块需要延迟渲染
    const { option, loading } = nextProps;
    if (loading) {
      this.chartDom.showLoading('default', Loading_Option);
    } else {
      this.chartDom.hideLoading();
    }
    window.addEventListener('resize', () => this.chartDom && this.chartDom.resize());
    this.chartDom.setOption(option);
  }

  // componentWillUnmount() {
  //   if (this.chartDom) {
  //     // eCharts.dispose(this.chartDom);
  //   }
  // }

  render() {
    const newProps = { ...this.props };
    delete newProps.option;
    delete newProps.loading;
    return (
      <div
        ref={dom => {
          this.dom = dom;
        }}
        style={{
          height: '100%',
          width: '100%',
        }}
        {...newProps}
      />
    );
  }
}
