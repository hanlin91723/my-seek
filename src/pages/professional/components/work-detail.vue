<template>
  <div class="work-detail">
    <el-form :model="form" inline>
      <el-form-item label="领域类型" class="form-item">
        <el-cascader
          v-model="form.fieldType"
          :options="fieldOptions"
          :props="cascaderProps"
          :show-all-levels="false"
          clearable
          filterable
          value-on-clear=""
          placeholder="全部"
          @change="handleFieldChange"
        />
      </el-form-item>
      <el-form-item label="作品类型">
        <el-segmented
          v-model="form.workType"
          :options="workTypeOptions"
          @change="handleWorkTypeChange"
        />
      </el-form-item>
    </el-form>
    <div class="card-list">
      <el-card v-for="item in list" :key="item.id" class="card-item" shadow="always">
        <el-descriptions :column="4">
          <template #title>
            <div class="descriptions-header">
              <el-tag type="primary">{{ item.type_name }}</el-tag>
              <span>{{ item.work_name }}</span>
            </div>
          </template>
          <el-descriptions-item label="所属一级领域：" :width="width" :label-width="labelWidth">
            {{ item.field_name }}
          </el-descriptions-item>
          <el-descriptions-item label="所属二级领域：" :width="width" :label-width="labelWidth">
            {{ item.subfield_name }}
          </el-descriptions-item>
          <el-descriptions-item label="发布时间：" :width="width" :label-width="labelWidth">
            {{ item.publication_date }}
          </el-descriptions-item>
          <el-descriptions-item label="FWCI：" :width="width" :label-width="labelWidth">
            {{ item.fwci }}
          </el-descriptions-item>
          <el-descriptions-item label="作品引用数：" :width="width" :label-width="labelWidth">
            {{ item.referenced_works_count }}
          </el-descriptions-item>
          <el-descriptions-item label="作品被引数量：" :width="width" :label-width="labelWidth">
            {{ item.cited_by_count }}
          </el-descriptions-item>
          <el-descriptions-item label="语言：" :width="width" :label-width="labelWidth">
            {{ item.languages }}
          </el-descriptions-item>
          <el-descriptions-item label="作者署名：" :width="width" :label-width="labelWidth">
            {{ item.author_signature }}
          </el-descriptions-item>
          <el-descriptions-item label="来源：" :span="2" :width="width" :label-width="labelWidth">
            {{ item.source_name }}
          </el-descriptions-item>
          <el-descriptions-item
            label="所属机构："
            :span="2"
            :width="width"
            :label-width="labelWidth"
          >
            {{ item.institutions }}
          </el-descriptions-item>
          <el-descriptions-item
            label="话题名称："
            :span="2"
            :width="width"
            :label-width="labelWidth"
          >
            {{ item.topic_name }}
          </el-descriptions-item>
          <el-descriptions-item
            label="所有作者："
            :span="2"
            :width="width"
            :label-width="labelWidth"
          >
            {{ item.authorships }}
          </el-descriptions-item>
          <el-descriptions-item label="描述：" :span="4" :width="width" :label-width="labelWidth">
            {{ item.description_info }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <el-empty v-if="list.length === 0" :image-size="200" />
    <el-pagination
      v-else
      class="pagination"
      :current-page="currentPage"
      :page-size="pageSize"
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getWorkDetail, getWorkType } from '@/api/professional';
import { getFieldList } from '@/api/field';
export default {
  data() {
    return {
      form: {
        fieldType: '',
        workType: '0',
      },
      cascaderProps: {
        multiple: false,
        checkStrictly: true, // 允许只选一级
        value: 'value',
        label: 'label',
        children: 'children',
        emitPath: true, // 返回由该节点所在的各级菜单的值所组成的数组
      },
      fieldOptions: [],
      workTypeOptions: [{ label: '全部', value: '0' }],
      list: [],
      width: 150,
      labelWidth: 100,
      // 分页控制
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  async mounted() {
    await this.getFieldData();
    await this.handleFieldChange(this.form.fieldType);
    this.getData(); // 第一次加载
  },
  methods: {
    async getFieldData() {
      const { data } = await getFieldList();
      this.fieldOptions = data;
    },
    // 根据所选领域拉取子维度
    async handleFieldChange(val) {
      const arr = val ? val.concat('') : ['', ''];
      const { data } = await getWorkType({
        author_id: this.$route.params.id,
        field_id: arr[0],
        subfield_id: arr[1],
      });
      this.workTypeOptions = data.workType.map(item => ({
        label: `${item.type_name}(${item.num})`,
        value: item.type_id,
      }));
      if (this.workTypeOptions.length === 0) {
        this.workTypeOptions = [{ label: '全部(0)', value: '0' }];
      }
      this.form.workType = this.workTypeOptions[0]?.value || '0';
      this.handleSearch();
    },
    handleWorkTypeChange(val) {
      console.log(val);
      console.log(this.form);
      this.handleSearch();
    },
    handleSearch() {
      this.currentPage = 1;
      this.getData();
    },
    async getData() {
      const arr = this.form.fieldType ? this.form.fieldType.concat('') : ['', ''];
      const params = {
        author_id: this.$route.params.id,
        code: this.form.workType,
        field_id: arr[0],
        subfield_id: arr[1],
        page: this.currentPage,
        pageSize: this.pageSize,
      };
      const { data } = await getWorkDetail(params);
      this.total = data.totalNum; // 总条数
      this.list = data.dataList;
    },
    // 页码变化
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-item {
  margin-right: 20px;
  .input {
    width: 200px;
  }
}
.card-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  .card-item {
    :deep(.name) {
      font-size: 16px;
      font-weight: 700;
    }
    .descriptions-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin: 20px auto;
}
</style>
