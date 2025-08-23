<template>
  <el-menu-item :key="item.path" :index="item.path">
    <router-link :key="item.redirect" :to="item.redirect">
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
<style lang="scss" scoped></style>
