<template>
  <div class="data-board">
    <div ref="comment" class="comment">
    </div>
    <div ref="article" class="article">
    </div>
    <div ref="classify" class="classify">
    </div>
    <div ref="tag" class="tag">
    </div>
    <!-- <div ref="tag" class="tag"> -->
    <!-- </div> -->
  </div>
</template>
<script>
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart, LineChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { SVGRenderer } from 'echarts/renderers';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  SVGRenderer
]);
export default {
  data() {
    return {
      classify: {
        title: {
          text: '专栏文章分布'
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 100,
                name: 'A'
              },
              {
                value: 200,
                name: 'B'
              },
              {
                value: 300,
                name: 'C'
              },
              {
                value: 400,
                name: 'D'
              },
              {
                value: 500,
                name: 'E'
              }
            ],
            roseType: 'area'
          }
        ]
      },
      tag: {
        title: {
          text: '书签文章',
          left: 'center',
          top: 'center'
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: 'A'
              },
              {
                value: 234,
                name: 'B'
              },
              {
                value: 1548,
                name: 'C'
              }
            ],
            radius: ['40%', '70%']
          }
        ]
      },
      article: {
        title: {
          text: '7日内文章发布情况'
        },
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 23, 19],
            type: 'line',
            smooth: true
          },
          {
            data: [0, 2, 8, 3, 9],
            type: 'line',
            smooth: true
          }
        ]
      },
      browse: {
        title: {
          text: '7日内博客浏览情况'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var commentChart = echarts.init(this.$refs.comment);
      const classifyChart = echarts.init(this.$refs.classify);
      const articleChart = echarts.init(this.$refs.article);
      const tagChart = echarts.init(this.$refs.tag);
      classifyChart.setOption(this.classify);
      articleChart.setOption(this.article)
      commentChart.setOption(this.browse);
      tagChart.setOption(this.tag);
    }

  }
}
</script>
<style lang="less" scoped>
.data-board {
  display: flex;
  flex-wrap: wrap;

  .comment,
  .article,
  .classify,
  .tag {
    // flex: 1;
    width: 50%;
    height: 50%;
  }
}
</style>
