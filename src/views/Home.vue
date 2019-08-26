<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <Nav />
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";

export default {
  name: "home",
  components: {
    Nav
  }
};
</script>

<style scoped lang='less'>
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: rgb(84, 92, 100);
      height: 100%;
      text-align: left;
      .el-menu {
        border-right: 0;
      }
    }
    .el-header{
      display: flex;
      align-items: center
    }
  }
}
</style>
