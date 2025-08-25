<template>
  <div class="detail">
    <el-card class="card-item" shadow="always">
      <el-descriptions :column="4" :title="info.author_name">
        <el-descriptions-item label="作品数：" :width="width" :label-width="labelWidth">
          {{ info.works_count }}
        </el-descriptions-item>
        <el-descriptions-item label="被引数：" :width="width" :label-width="labelWidth">
          {{ info.cited_by_count }}
        </el-descriptions-item>
        <el-descriptions-item label="H指数：" :width="width" :label-width="labelWidth">
          {{ info.h_index }}
        </el-descriptions-item>
        <el-descriptions-item label="i10指数：" :width="width" :label-width="labelWidth">
          {{ info.i10_index }}
        </el-descriptions-item>
        <el-descriptions-item label="ORCID：" :span="2" :width="width" :label-width="labelWidth">
          {{ info.orcid }}
        </el-descriptions-item>
        <el-descriptions-item label="当前机构：" :span="2" :width="width" :label-width="labelWidth">
          <!-- <el-tag class="prevInstitution-tag" type="primary" effect="plain"> -->
          {{ getInstitutionName(info.institutions) }}
          <!-- </el-tag> -->
        </el-descriptions-item>
        <el-descriptions-item label="别名：" :span="2" :width="width" :label-width="labelWidth">
          {{ info.alternate_names }}
        </el-descriptions-item>
        <el-descriptions-item label="过往机构：" :span="4" :width="width" :label-width="labelWidth">
          <el-tag
            v-for="item in info.past_institutions"
            :key="item.institution_id"
            class="prevInstitution-tag"
            type="info"
            effect="plain"
          >
            {{ item.institution_name }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="话题：" :span="4" :width="width" :label-width="labelWidth">
          <div class="inline-flex">
            <span v-for="txt in showTopics" :key="txt" class="topic-tag">
              {{ txt }}
            </span>
            <el-button
              v-if="info.topicsList?.length > 5"
              class="topic-tag-more"
              type="primary"
              link
              @click="expanded = !expanded"
            >
              {{ expanded ? '收起' : '更多' }}
            </el-button>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="card-item margin-top" shadow="always">
      <el-tabs>
        <el-tab-pane label="数据概览" lazy>
          <div class="chart-wrap">
            <v-chart ref="pie1" class="pie-chart" :option="fieldWorkOpt" autoresize />
            <v-chart ref="pie2" class="pie-chart" :option="subFieldWorkOpt" autoresize />
            <v-chart class="pie-chart" :option="firstAuthorWorkTypeOpt" autoresize />
          </div>
          <v-chart class="chart" :option="authorPubWorkOpt" autoresize />
          <v-chart class="chart" :option="workTypeOpt" autoresize />
          <v-chart class="chart" :option="authorSignOpt" autoresize />
        </el-tab-pane>
        <el-tab-pane label="作品详情" lazy>
          <work-detail />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import WorkDetail from './components/work-detail.vue';
import { getOverview, getBasicInfo } from '@/api/professional';
export default {
  components: { WorkDetail },
  data() {
    return {
      width: 100,
      labelWidth: 70,
      expanded: false,
      info: {},
      fieldWorkOpt: {},
      subFieldWorkOpt: {},
      firstAuthorWorkTypeOpt: {},
      authorPubWorkOpt: {},
      workTypeOpt: {},
      authorSignOpt: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    showTopics() {
      const topicArr = this.info.topicsList || [];
      return this.expanded ? topicArr : topicArr.slice(0, 5);
    },
  },
  mounted() {
    this.getBasicInfoData();
    this.getOverviewData();
  },
  methods: {
    async getBasicInfoData() {
      const { data } = await getBasicInfo(this.id);
      this.info = data;
    },
    async getOverviewData() {
      const { data } = await getOverview(this.id);
      this.fieldWorkOpt = this.getFieldWorkOpt(data.field_work_map);
      this.subFieldWorkOpt = this.getSubFieldWorkOpt(data.subfield_work_map);
      this.firstAuthorWorkTypeOpt = this.getFirstAuthorWorkTypeOpt(data.first_author_work_type_map);
      this.authorPubWorkOpt = this.getAuthorPubWorkOpt(data.author_pub_work_map);
      this.workTypeOpt = this.getWorkTypeOpt(data.work_type_map);
      this.authorSignOpt = this.getAuthorSignOpt(data.author_sign_map);
    },
    getInstitutionName(institutions) {
      return institutions?.map(item => item.institution_name).join('、');
    },
    getFieldWorkOpt(data) {
      if (data.length === 0) {
        return this.noData('一级领域作品分布情况');
      }
      const _this = this;
      return {
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
              formatter: '{name|{b}}\n{time|{d}%}',
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
            data,
          },
        ],
      };
    },
    getSubFieldWorkOpt(data) {
      if (data.length === 0) {
        return this.noData('一级领域作品分布情况');
      }
      const _this = this;
      return {
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
              formatter: '{name|{b}}\n{time|{d}%}',
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
            data,
          },
        ],
      };
    },
    getFirstAuthorWorkTypeOpt(data) {
      if (data.length === 0) {
        return this.noData('第一作者作品分布情况');
      }
      return {
        title: {
          text: '第一作者作品分布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          top: '50',
          bottom: '20',
          containLabel: true,
        },
        xAxis: {
          minInterval: 1,
        },
        yAxis: {
          type: 'category',
          data: data.map(item => item.name),
          inverse: true,
        },
        series: [
          {
            realtimeSort: true,
            type: 'bar',
            data: data.map(item => item.value),
            barMaxWidth: 50,
            label: {
              show: true,
              position: 'right',
            },
          },
        ],
      };
    },
    getAuthorPubWorkOpt(data) {
      if (data.length === 0) {
        return this.noData('一级领域作品分布情况');
      }
      return {
        title: {
          text: '作品发布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.name),
        },
        yAxis: {
          minInterval: 1,
        },
        series: [
          {
            type: 'bar',
            data: data.map(item => item.value),
            barMaxWidth: 50,
          },
        ],
      };
    },
    getWorkTypeOpt(data) {
      if (data.length === 0) {
        return this.noData('一级领域作品分布情况');
      }
      const names = [...new Set(data.flatMap(cat => cat.dataList.map(item => item.name)))].sort();
      const series = data.map(item => {
        // 构建年份 -> 值的映射，缺失补 0
        const valueMap = Object.fromEntries(item.dataList.map(d => [d.name, d.value]));
        return {
          name: item.legendName,
          type: 'line',
          data: names.map(y => valueMap[y] || 0),
        };
      });
      return {
        title: {
          text: '作品类型发布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: data.map(item => item.legendName),
          top: '40',
        },
        grid: {
          top: '90',
          bottom: '20',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: names,
        },
        yAxis: {
          minInterval: 1,
        },
        series,
      };
    },
    getAuthorSignOpt(data) {
      if (data.length === 0) {
        return this.noData('一级领域作品分布情况');
      }
      const names = [...new Set(data.flatMap(cat => cat.dataList.map(item => item.name)))].sort();
      const series = data.map(item => {
        // 构建年份 -> 值的映射，缺失补 0
        const valueMap = Object.fromEntries(item.dataList.map(d => [d.name, d.value]));
        return {
          name: item.legendName,
          type: 'bar',
          data: names.map(y => valueMap[y] || 0),
          barMaxWidth: 50,
        };
      });
      return {
        title: {
          text: '作者署名情况分布',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: data.map(item => item.legendName),
          top: '40',
        },
        grid: {
          top: '90',
          bottom: '20',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: names,
        },
        yAxis: {
          minInterval: 1,
        },
        series,
      };
    },
    noData(title) {
      return {
        title: {
          text: title,
          subtext: '暂无数据',
          left: 'center',
          subtextStyle: {
            fontSize: 16,
            color: '#666',
            height: 200,
            lineHeight: 200,
          },
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.inline-flex {
  display: inline-flex;
  flex-direction: column;
  // gap: 4px;
  .topic-tag {
  }
  .topic-tag-more {
    justify-content: flex-start;
    width: fit-content;
    padding: 0;
    text-align: left;
    line-height: 21px;
    font-weight: 400;
  }
}
.margin-top {
  margin-top: 20px;
}
.prevInstitution-tag {
  margin-right: 6px;
}
.chart-wrap {
  display: flex;
  margin-top: 20px;
  .pie-chart {
    width: 33%;
    height: 300px;
  }
}
.chart {
  width: 100%;
  height: 300px;
  margin-top: 20px;
}
</style>
