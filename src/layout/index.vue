<template>
  <el-container class="common-layout">
    <el-aside width="150px" class="aside">
      <sideBar :routers="routers"></sideBar>
    </el-aside>
    <el-container>
      <el-header>
        <HeaderNav></HeaderNav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sideBar from './components/sideBar.vue';
import router from '@/router/index';
import HeaderNav from './components/header.vue';
export default {
  components: {
    sideBar,
    HeaderNav,
  },
  computed: {
    routers() {
      return router.getRoutes().filter(item => item.children.length > 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.common-layout {
  min-height: 100vh;
  .aside {
    position: sticky;
    top: 0;
    overflow-y: auto;
    height: 100vh;
  }
}
</style>
