<!-- 头部 -->
<template>
  <div class="x-admin-header">
    <div class="hread-l">
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item, i) in levelList" :key="i" :to="{ path: item.path }">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const levelList = computed(() => route.matched);
console.log(levelList.value);
</script>
<style lang="scss" scoped>
.x-admin-header {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hread-l {
    display: flex;
    align-items: center;

    .nav_header_fold {
      display: inline-block;

      i {
        font-size: 20px;
        cursor: pointer;
        margin-right: 20px;
      }
    }

    .el-breadcrumb {
      display: inline-block;
    }
  }

  .header-r {
    display: flex;
    align-items: center;

    .icon-shezhi {
      cursor: pointer;
      font-size: 20px;
      transition: all 0.3s;

      &:hover {
        transform: rotate(45deg);
      }
    }

    .avatar-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 40px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }

    .language-wrapper {
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 10px;
      cursor: pointer;

      img {
        width: 20px;
        margin-right: 5px;
      }
    }
  }
}
</style>
