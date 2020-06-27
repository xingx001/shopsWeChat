const option = {
  color: ['#F5A623', '#26BBF2'],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    right: 0,
    top: 0,
    textStyle: {
      fontSize: 10,
      color: '#333333'
    },
    selectedMode: false,
    data: ['领取量', '使用量']
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    top: 30,
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#E9E9E9'
      }
    },
    axisLabel: {
      rotate: 45,
      color: '#B7B7B7',
      fontSize: 10
    },
    axisTick: {
      show: false,
      lineStyle: {
        width: 1
      }
    },
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#E9E9E9'
      }
    },
    axisLabel: {
      color: '#B7B7B7',
      fontSize: 10
    },
    axisTick: {
      show: false,
      lineStyle: {
        width: 1
      }
    },
  },
  series: [
    {
      name: '领取量',
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      smooth: true,
      lineStyle: {
        width: 1
      },
      data: []
    },
    {
      name: '使用量',
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      smooth: true,
      lineStyle: {
        width: 1
      },
      data: []
    }
  ]
};
export default option;
