<template>
  <div>
    <el-form :model="form" inline>
      <el-form-item label="专家名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="领域类型">
        <el-cascader
          v-model="form.fieldType"
          :options="fieldOptions"
          :props="cascaderProps"
          :show-all-levels="false"
          clearable
          placeholder="全部"
        />
      </el-form-item>
      <el-form-item>
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
        <el-descriptions :column="4" :title="item.name">
          <el-descriptions-item label="作品数：" :width="100">
            {{ item.works }}
          </el-descriptions-item>
          <el-descriptions-item label="被引数：" :width="100">
            {{ item.citations }}
          </el-descriptions-item>
          <el-descriptions-item label="H 指数：" :width="100">
            {{ item.hIndex }}
          </el-descriptions-item>
          <el-descriptions-item label="I10 指数：" :width="100">
            {{ item.i10Index }}
          </el-descriptions-item>
          <el-descriptions-item label="ORCID：" :span="2">{{ item.orcid }}</el-descriptions-item>
          <el-descriptions-item label="当前机构：" :span="2">
            {{ item.institution }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <el-pagination
      class="pagination"
      :current-page="currentPage"
      :page-size="pageSize"
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        emitPath: true, // 返回完整路径数组
      },
      fieldOptions: [
        {
          value: 'web',
          label: 'Web',
          children: [
            { value: 'frontend', label: '前端' },
            { value: 'backend', label: '后端' },
          ],
        },
        {
          value: 'mobile',
          label: '移动',
          children: [
            { value: 'ios', label: 'iOS' },
            { value: 'android', label: 'Android' },
          ],
        },
      ],
      listData: [
        {
          id: 1,
          name: '张三',
          works: 42,
          citations: 1280,
          hIndex: 18,
          i10Index: 25,
          orcid: '0000-0001-2345-6789',
          institution: '清华大学',
        },
        {
          id: 2,
          name: '李四',
          works: 60,
          citations: 2450,
          hIndex: 22,
          i10Index: 38,
          orcid: '0000-0002-3456-7890',
          institution: '北京大学',
        },
        {
          id: 3,
          name: '王五',
          works: 35,
          citations: 980,
          hIndex: 15,
          i10Index: 20,
          orcid: '0000-0003-4567-8901',
          institution: '复旦大学',
        },
        {
          id: 4,
          name: '赵六',
          works: 55,
          citations: 2100,
          hIndex: 20,
          i10Index: 32,
          orcid: '0000-0004-5678-9012',
          institution: '上海交通大学',
        },
        {
          id: 5,
          name: '孙七',
          works: 28,
          citations: 750,
          hIndex: 12,
          i10Index: 15,
          orcid: '0000-0005-6789-0123',
          institution: '浙江大学',
        },
        {
          id: 6,
          name: '周八',
          works: 65,
          citations: 3200,
          hIndex: 25,
          i10Index: 40,
          orcid: '0000-0006-7890-1234',
          institution: '中国科学技术大学',
        },
        {
          id: 7,
          name: '吴九',
          works: 38,
          citations: 1100,
          hIndex: 16,
          i10Index: 22,
          orcid: '0000-0007-8901-2345',
          institution: '南京大学',
        },
        {
          id: 8,
          name: '郑十',
          works: 50,
          citations: 1900,
          hIndex: 19,
          i10Index: 30,
          orcid: '0000-0008-9012-3456',
          institution: '哈尔滨工业大学',
        },
        {
          id: 9,
          name: '钱十一',
          works: 72,
          citations: 4100,
          hIndex: 28,
          i10Index: 45,
          orcid: '0000-0009-0123-4567',
          institution: '中山大学',
        },
        {
          id: 10,
          name: '孔十二',
          works: 30,
          citations: 600,
          hIndex: 11,
          i10Index: 14,
          orcid: '0000-0010-1234-5678',
          institution: '华中科技大学',
        },
        {
          id: 11,
          name: '王十三',
          works: 45,
          citations: 1400,
          hIndex: 17,
          i10Index: 28,
          orcid: '0000-0011-2345-6789',
          institution: '北京理工大学',
        },
        {
          id: 12,
          name: '王十四',
          works: 34,
          citations: 1200,
          hIndex: 15,
          i10Index: 23,
          orcid: '0000-0012-3456-7890',
          institution: '上海交通大学',
        },
      ],
      list: [],
      // 分页控制
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  mounted() {
    this.total = this.listData.length; // 总条数
    this.slicePage(); // 第一次加载
  },
  methods: {
    // 统一切片函数
    slicePage() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.list = this.listData.slice(start, end);
    },
    handleSearch() {
      this.slicePage();
    },
    // 页码变化
    handleCurrentChange(page) {
      this.currentPage = page;
      this.slicePage();
    },

    // 每页条数变化
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 回到第一页
      this.slicePage();
    },
    handleClick(item) {
      this.$router.push({
        path: `/professional/detail/${item.id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .card-item {
    cursor: pointer;
    :deep(.name) {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin: 20px auto;
}
</style>
