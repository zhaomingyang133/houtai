<template>
  <div>
    <el-switch v-model="value3" active-text="按月付费" inactive-text="按年付费"></el-switch>
    <el-switch
      style="display: block"
      v-model="value4"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="按月付费"
      inactive-text="按年付费"
    ></el-switch>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-slider v-model="value1"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">格式化 Tooltip</span>
      <el-slider v-model="value2" :format-tooltip="formatTooltip"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">禁用</span>
      <el-slider v-model="value5" disabled></el-slider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value3: true,
      value4: true,
      value1: 0,
      value2: 20,
      value5: 42
    };
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    }
  }
};
</script>