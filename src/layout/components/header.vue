<!-- 头部 -->
<template>
  <div class="x-admin-header">
    <el-breadcrumb>
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
        :to="index === levelList.length - 1 ? '' : item.path"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    levelList() {
      return this.$route.matched;
    },
  },
};
</script>
<style lang="scss" scoped>
.x-admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
