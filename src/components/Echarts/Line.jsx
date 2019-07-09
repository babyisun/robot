import React from 'react';
import Base from './Base';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';

const option = {
  color: ['#e60500'],
  grid: {
    left: '3%',
    right: '5%',
    bottom: '3%',
    // top: '6%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  // legend: {
  //   data: ['新增用户'],
  // },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: null,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '新增用户',
      type: 'line',
      data: null,
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      itemStyle: {
        emphasis: {
          color: '#fe9576',
          borderColor: 'rgba(254,150,133,0.2)',
          borderWidth: 12,
        },
      },
      lineStyle: {
        width: 3,
      },
      markPoint: {
        data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
      },
      markLine: {
        data: [
          {
            type: 'average',
            name: '平均值',
            label: {
              // formatter: (a, b) => {
              //   console.log(a);
              //   return a.data.value;
              // },
              //   position: 'end',
              formatter: '{b}\n{c}',
            },
          },
        ],
      },
    },
  ],
};

 const Line = (props) => {
    const { loading, data, name } = props;
    option.xAxis.data = data ? data.map(f => f.name) : null;
    option.series[0].name = name;
    option.series[0].data = data;
    // console.log(data ? data.map(f => f.name) : 'not yet');
    return (
      <div>
        <Base style={{ minHeight: 'calc(90vh - 350px)' }} loading={loading} option={option} />
      </div>
    );
}

export default Line;
