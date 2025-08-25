<template>
  <div>
    <el-form :model="form" inline>
      <el-form-item label="领域名称" class="form-item">
        <el-input v-model="form.name" clearable class="input" />
      </el-form-item>
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
        />
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="card-list">
      <el-card
        v-for="item in list"
        :key="item.id"
        class="card-item"
        shadow="hover"
        @click="handleClick(item)"
      >
        <el-descriptions :column="4">
          <template #title>
            <div class="descriptions-header">
              <span>{{ item.name }}</span>
              <el-tag :type="item.type === 1 ? 'primary' : 'info'">
                {{ item.type === 1 ? '一级领域' : '二级领域' }}
              </el-tag>
            </div>
          </template>
          <el-descriptions-item label="领域大类：" :width="width" :label-width="labelWidth">
            {{ item.domain_name }}
          </el-descriptions-item>
          <el-descriptions-item label="作品数：" :width="width" :label-width="labelWidth">
            {{ item.works_count }}
          </el-descriptions-item>
          <el-descriptions-item label="被引数：" :width="width" :label-width="labelWidth">
            {{ item.cited_by_count }}
          </el-descriptions-item>
          <el-descriptions-item label="相关领域数量：" :width="width" :label-width="labelWidth">
            {{ item.siblings_num }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="item.type === 1"
            label="相关二级领域数量："
            :width="width"
            :label-width="labelWidth"
          >
            {{ item.subfields_num }}
          </el-descriptions-item>
          <el-descriptions-item
            v-else-if="item.type === 2"
            label="相关话题数量："
            :width="width"
            :label-width="labelWidth"
          >
            {{ item.topics_num }}
          </el-descriptions-item>
          <el-descriptions-item
            label="其他名称："
            :span="3"
            :width="width"
            :label-width="labelWidth"
          >
            {{ item.name_alternatives }}
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
import { getList, getFieldList } from '@/api/field';
export default {
  data() {
    return {
      width: 150,
      labelWidth: 130,
      form: {
        name: '',
        fieldType: '',
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
      list: [],
      // 分页控制
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  mounted() {
    this.getData(); // 第一次加载
    this.getFieldData();
  },
  methods: {
    handleSearch() {
      this.currentPage = 1;
      this.getData();
    },
    async getData() {
      const arr = this.form.fieldType ? this.form.fieldType.concat('') : ['', ''];
      const params = {
        search_string: this.form.name,
        field_id: arr[0],
        subfield_id: arr[1],
        page: this.currentPage,
        pageSize: this.pageSize,
      };
      const { data } = await getList(params);
      this.total = data.totalNum;
      this.list = data.dataList;
    },
    // 页码变化
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getData();
    },
    async getFieldData() {
      const { data } = await getFieldList();
      this.fieldOptions = data;
    },
    handleClick(item) {
      this.$router.push({
        path: `/field/detail/${item.id}`,
      });
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
    cursor: pointer;
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
