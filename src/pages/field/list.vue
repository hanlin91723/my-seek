<template>
  <div>
    <div class="list">领域列表</div>
    <el-form :model="form" inline>
      <el-form-item label="领域名称">
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
    </el-form>
    <div class="card-list">
      <h3 class="title">主领域</h3>
      <el-card
        v-for="item in list.filter(item => item.type === '主领域')"
        :key="item.id"
        class="card-item"
        shadow="hover"
        @click="handleClick(item)"
      >
        <el-descriptions :column="2">
          <el-descriptions-item label="姓名">{{ item.name }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ item.age }}</el-descriptions-item>
          <el-descriptions-item label="职位">{{ item.job }}</el-descriptions-item>
          <el-descriptions-item label="入职时间">{{ item.date }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <h3 class="title">子领域</h3>
      <el-card
        v-for="item in list.filter(item => item.type === '子领域')"
        :key="item.id"
        class="card-item"
        shadow="hover"
        @click="handleClick(item)"
      >
        <el-descriptions :column="2">
          <el-descriptions-item label="姓名">{{ item.name }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ item.age }}</el-descriptions-item>
          <el-descriptions-item label="职位">{{ item.job }}</el-descriptions-item>
          <el-descriptions-item label="入职时间">{{ item.date }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
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
      list: [
        { id: 1, name: '张三', age: 28, job: '前端工程师', date: '2022-05-18', type: '主领域' },
        { id: 2, name: '李四', age: 32, job: '产品经理', date: '2021-03-12', type: '子领域' },
        { id: 3, name: '王五', age: 26, job: 'UI 设计师', date: '2023-01-09', type: '主领域' },
        { id: 4, name: '赵六', age: 30, job: 'Java 开发', date: '2020-07-22', type: '子领域' },
        { id: 5, name: '孙七', age: 27, job: '测试工程师', date: '2022-11-05', type: '子领域' },
        { id: 6, name: '周八', age: 29, job: '运维工程师', date: '2021-09-14', type: '主领域' },
        { id: 7, name: '吴九', age: 31, job: '数据分析师', date: '2020-12-30', type: '主领域' },
        { id: 8, name: '郑十', age: 25, job: '算法工程师', date: '2023-04-08', type: '子领域' },
        { id: 9, name: '钱十一', age: 33, job: '架构师', date: '2019-06-17', type: '主领域' },
        { id: 10, name: '孔十二', age: 24, job: '实习生', date: '2023-07-03', type: '子领域' },
      ],
      opts: [
        {
          name: '全部',
          num: 100,
          value: '0',
        },
        {
          name: '论文',
          num: 45,
          value: '1',
        },
      ],
    };
  },
  methods: {
    handleClick(item) {
      this.$router.push({
        path: `/field/detail/${item.id}`,
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
  .title {
    margin-top: 20px;
    font-weight: 700;
  }
  .card-item {
    cursor: pointer;
  }
}
</style>
