<template>
  <el-menu-item :key="item.path" :index="item.path" class="menu-item">
    <router-link :key="item.redirect" :to="item.redirect" class="menu-link">
      {{ item.meta.title }}
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
.menu-item {
  padding: 0 !important;
  &.is-active {
    background-color: var(--el-menu-hover-bg-color);
  }
  &:hover {
    background-color: #284470;
  }
}
.menu-link {
  width: 100%;
  padding: 0 var(--el-menu-base-level-padding);
}
</style>
