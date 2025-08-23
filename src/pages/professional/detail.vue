<template>
  <div class="detail">
    <el-card class="card-item" shadow="always">
      <el-descriptions :column="4" :title="info.name">
        <el-descriptions-item label="作品数：" :width="100">
          {{ info.works }}
        </el-descriptions-item>
        <el-descriptions-item label="被引数：" :width="100">
          {{ info.citations }}
        </el-descriptions-item>
        <el-descriptions-item label="H 指数：" :width="100">
          {{ info.hIndex }}
        </el-descriptions-item>
        <el-descriptions-item label="I10 指数：" :width="100">
          {{ info.i10Index }}
        </el-descriptions-item>
        <el-descriptions-item label="ORCID：" :span="2">{{ info.orcid }}</el-descriptions-item>
        <el-descriptions-item label="当前机构：" :span="2">
          {{ info.curInstitution }}
        </el-descriptions-item>
        <el-descriptions-item label="过往机构：" :span="4">
          <div class="inline-flex">
            <span v-for="item in info.prevInstitution" :key="item">{{ item }}</span>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="card-item margin-top" shadow="always">
      <el-tabs>
        <el-tab-pane label="数据概览" lazy>
          <div class="pie-chart-wrap">
            <v-chart ref="pie1" class="pie-chart" :option="pie1ChartOpts" autoresize />
            <v-chart ref="pie2" class="pie-chart" :option="pie2ChartOpts" autoresize />
            <v-chart class="pie-chart" :option="rankChartOpts" autoresize />
          </div>
          <v-chart class="chart" :option="bar1ChartOpts" autoresize />
          <v-chart class="chart" :option="lineChartOpts" autoresize />
          <v-chart class="chart" :option="bar2ChartOpts" autoresize />
        </el-tab-pane>
        <el-tab-pane label="作品详情" lazy>Config</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const _this = this;
    return {
      info: {
        id: 1,
        name: '张三',
        works: 42,
        citations: 1280,
        hIndex: 18,
        i10Index: 25,
        orcid: '0000-0001-2345-6789',
        prevInstitution: ['北京大学', '浙江大学', '复旦大学', '上海交通大学'],
        curInstitution: '清华大学',
      },
      pie1ChartOpts: {
        title: {
          text: '一级领域作品分布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: [0, 100],
            center: ['50%', '50%'],
            left: '20',
            right: '20',
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              alignTo: 'edge',
              formatter: '{name|{b}}\n{time|{c} 小时}',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
              rich: {
                time: {
                  fontSize: 10,
                  color: '#999',
                },
              },
            },
            labelLine: {
              length: 15,
              length2: 0,
              maxSurfaceAngle: 80,
            },
            labelLayout: function (params) {
              const isLeft = params.labelRect.x < _this.$refs.pie1.getWidth() / 2;
              const points = params.labelLinePoints;
              // Update the end point.
              points[2][0] = isLeft
                ? params.labelRect.x
                : params.labelRect.x + params.labelRect.width;
              return {
                labelLinePoints: points,
              };
            },
            data: [
              { name: '圣彼得堡来客', value: 5.6 },
              { name: '陀思妥耶夫斯基全集', value: 1 },
              { name: '史记精注全译（全6册）', value: 0.8 },
              { name: '加德纳艺术通史', value: 0.5 },
              { name: '表象与本质', value: 0.5 },
              { name: '其它', value: 3.8 },
            ],
          },
        ],
      },
      pie2ChartOpts: {
        title: {
          text: '二级领域作品分布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: [0, 100],
            center: ['50%', '50%'],
            left: '20',
            right: '20',
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              alignTo: 'edge',
              formatter: '{name|{b}}\n{time|{c} 小时}',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
              rich: {
                time: {
                  fontSize: 10,
                  color: '#999',
                },
              },
            },
            labelLine: {
              length: 15,
              length2: 0,
              maxSurfaceAngle: 80,
            },
            labelLayout: function (params) {
              const isLeft = params.labelRect.x < _this.$refs.pie2.getWidth() / 2;
              const points = params.labelLinePoints;
              // Update the end point.
              points[2][0] = isLeft
                ? params.labelRect.x
                : params.labelRect.x + params.labelRect.width;
              return {
                labelLinePoints: points,
              };
            },
            data: [
              { name: '圣彼得堡来客', value: 5.6 },
              { name: '陀思妥耶夫斯基全集', value: 1 },
              { name: '史记精注全译（全6册）', value: 0.8 },
              { name: '加德纳艺术通史', value: 0.5 },
              { name: '表象与本质', value: 0.5 },
              { name: '其它', value: 3.8 },
            ],
          },
        ],
      },
      rankChartOpts: {
        title: {
          text: '第一作者作品分布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {},
        yAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E'],
          inverse: true,
        },
        series: [
          {
            realtimeSort: true,
            type: 'bar',
            data: [10, 20, 30, 40, 50],
            label: {
              show: true,
              position: 'right',
            },
          },
        ],
      },
      bar1ChartOpts: {
        title: {
          text: '作品发布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [150, 230, 224, 218, 135, 147, 260],
          },
        ],
      },
      lineChartOpts: {
        title: {
          text: '作品类型发布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          bottom: '20',
        },
        grid: {
          bottom: '60',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {},
        series: [
          {
            name: 'Email',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Union Ads',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video Ads',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search Engine',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      bar2ChartOpts: {
        title: {
          text: '作者署名情况分布',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          data: ['第一作者', '中间作者', '尾部作者'],
          top: '40',
        },
        grid: {
          top: '90',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {},
        series: [
          {
            name: '第一作者',
            type: 'bar',
            data: [150, 230, 224, 218, 135, 147, 260],
          },
          {
            name: '中间作者',
            type: 'bar',
            data: [150, 230, 224, 218, 135, 147, 260],
          },
          {
            name: '尾部作者',
            type: 'bar',
            data: [150, 230, 224, 218, 135, 147, 260],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.inline-flex {
  display: inline-flex;
  flex-direction: column;
}
.margin-top {
  margin-top: 20px;
}
.pie-chart-wrap {
  display: flex;
  .pie-chart {
    width: 33%;
    height: 300px;
  }
}
.chart {
  width: 100%;
  height: 300px;
}
</style>
