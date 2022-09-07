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
import { getDataForDataBoard } from '@/api/api'
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
          text: '专栏文章分布',
        },
        series: [
          {
            type: 'pie',
            name: '销售量',
            tooltip: {
              trigger: 'item'//触发类型item数据项图形触发
            },
            // label: {
            //   //echarts饼图内部显示百分比设置
            //   show: true,
            //   position: "inside", //outside 外部显示  inside 内部显示
            //   formatter: `{d}%`,
            //   color: "#ffffff", //颜色
            //   fontSize: 12 //字体大小
            // },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {c} ({d}%)' //带当前图例名 + 百分比
                  // formatter: '{d}%' //只要百分比
                },
                labelLine: { show: true }
              }
            },
            data: [
              //   {
              //     value: 100,
              //     name: 'A'
              //   },
              //   {
              //     value: 200,
              //     name: 'B'
              //   },
              //   {
              //     value: 300,
              //     name: 'C'
              //   },
              //   {
              //     value: 400,
              //     name: 'D'
              //   },
              //   {
              //     value: 500,
              //     name: 'E'
              //   }
            ],
            roseType: 'area'
          }
        ]
      },
      tag: {
        title: {
          text: '书签文章',
          left: 'center',
          top: 'center',
        },
        label: {
          //echarts饼图内部显示百分比设置
          show: true,
          position: "inside", //outside 外部显示  inside 内部显示
          formatter: `{d}%`,
          color: "#ffffff", //颜色
          fontSize: 12 //字体大小
        },
        series: [
          {
            type: 'pie',
            data: [
              // {
              //   value: 335,
              //   name: 'A'
              // },
              // {
              //   value: 234,
              //   name: 'B'
              // },
              // {
              //   value: 1548,
              //   name: 'C'
              // }
            ],
            // itemStyle: {
            //   emphasis: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   },
            //   normal: {
            //     label: {
            //       show: true,
            //       formatter: '{b} : {c} ({d}%)' //带当前图例名 + 百分比
            //       // formatter: '{d}%' //只要百分比
            //     },
            //     labelLine: { show: true }
            //   }
            // },
            radius: ['40%', '70%']
          }
        ]
      },
      article: {
        title: {
          text: '7日内文章发布情况'
        },
        xAxis: {
          data: [1, 2, 3, 4, 5, 6, 7],
          name: '过去天数(天)',
          nameLocation: 'middle',
          nameGap: 30
        },
        yAxis: {
          name: '篇幅数(篇)',
          data: [0, 1, 2, 3],

        },
        series: [
          {
            data: [],
            type: 'line',
            markPoint: {//图表标注。
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {//图表标线。
              data: [{ type: 'average', name: 'Avg' }]
            },
            smooth: true
          },
          {
            data: [],
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
        yAxis: {

        },
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
    async init() {
      const res = await getDataForDataBoard();
      console.log('res', res);

      if (res.status == 200) {
        var commentChart = echarts.init(this.$refs.comment);
        const classifyChart = echarts.init(this.$refs.classify);
        const articleChart = echarts.init(this.$refs.article);
        const tagChart = echarts.init(this.$refs.tag);
        console.log('', res.data.classification, this.classify.series[0].data);

        this.classify.series[0].data = res.data.classification;
        this.tag.series[0].data = res.data.articleOfTag;
        this.article.series[0].data = res.data.blogsOf7;
        this.article.series[1].data = res.data.jottingsOf7;
        classifyChart.setOption(this.classify);
        articleChart.setOption(this.article)
        commentChart.setOption(this.browse);
        tagChart.setOption(this.tag);
      }
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
