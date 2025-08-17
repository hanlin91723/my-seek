<!--  -->
<template>
  <div class="x-nav">
    <el-menu
      unique-opened
      class="el-menu-vertical-demo"
      :default-active="activePath"
      text-color="#fff"
      background-color="#324157"
    >
      <sidebar-item v-for="route in routers" :key="route.path" :item="route"></sidebar-item>
    </el-menu>
  </div>
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

  methods: {
    gotoDashboard() {
      this.$router.push({
        name: 'dashboard',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.x-nav {
  height: 100%;
}
.el-menu {
  border-right: none;
  h5 {
    height: 60px;
    text-align: center;
    display: flex;
    align-items: center;
    &.true-collapse-h5 {
      justify-content: center;
    }
    img {
      cursor: pointer;
    }
    .false-collapse {
      height: 48px;
    }
    .true-collapse {
      height: 40px;
    }
    span {
      white-space: nowrap;
      font-size: 24px;
      font-weight: 500;
      color: aquamarine;
    }
  }

  // .el-menu-item:hover{
  //     background-color: transparent
  // }
}
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
    }
  }
}
</style>
