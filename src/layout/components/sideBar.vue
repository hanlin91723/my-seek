<!--  -->
<template>
  <el-scrollbar>
    <el-menu
      unique-opened
      class="menu"
      :default-active="activePath"
      text-color="#fff"
      background-color="#324157"
    >
      <sidebar-item v-for="route in routers" :key="route.path" :item="route"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import sidebarItem from './sidebarItem.vue';

export default {
  name: 'SideBar',

  components: {
    sidebarItem,
  },
  props: {
    routers: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  computed: {
    activePath() {
      return this.$route.meta.parentPath;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu {
  border-right: none;
}
</style>
