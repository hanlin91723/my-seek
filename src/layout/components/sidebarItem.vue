<template>
  <el-menu-item :key="item.path" :index="item.path">
    <router-link :key="item.redirect" :to="item.redirect">
      <span>{{ item.meta.title }}</span>
    </router-link>
  </el-menu-item>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 221px;
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
  i {
    color: #fff;
    margin-right: 20px;
    font-size: 18px;
  }
  .el-menu-item {
    a {
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
    }
  }
}
</style>
