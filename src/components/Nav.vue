<template>
  <el-menu
    default-active="/index"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    :router="true"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/index">
      <i class="el-icon-setting"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu :index="index+''" :key="item.id" v-for="(item,index) in menuList">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item :index="item.url" :key="item.id" v-for="(item) in item.child">{{item.title}}</el-menu-item>
      <!-- <el-menu-item index="/Home/users" >用户列表</el-menu-item>
          <el-menu-item index="character">角色列表</el-menu-item>
      <el-menu-item index="/Home/permission">菜单列表</el-menu-item>-->
    </el-submenu>
    <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>产品库管理</span>
        </template>
          <el-menu-item index="product">产品列表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>商户管理</span>
        </template>
          <el-menu-item index="merchant">商户信息</el-menu-item>
          <el-menu-item index="32">小程序信息</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>财务管理</span>
        </template>
          <el-menu-item index="order">订单列表</el-menu-item>
          <el-menu-item index="42">商户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-ship"></i>
          <span>旅游管理</span>
        </template>
          <el-menu-item index="51">旅游攻略</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>小程序配置</span>
        </template>
          <el-menu-item index="61">轮播图列表</el-menu-item>
          <el-menu-item index="62">热门城市列表</el-menu-item>
          <el-menu-item index="63">导航栏配置</el-menu-item>
    </el-submenu>-->
  </el-menu>
</template>

<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      url: "/users",
      menuList: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getMenus() {
      this.axios.get("/permission").then(res => {
        console.log(res);
        this.menuList = res.data.data;
      });
    }
  },
  created() {
    this.getMenus();
  }
};
</script>

<style>
.menubar {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
