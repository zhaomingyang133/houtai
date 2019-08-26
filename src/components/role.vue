<template>
  <div>
    <el-button @click="addMenu">新增</el-button>
    <el-table :data="roleData" style="width: 100%" row-key="name">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <!-- <el-table-column prop="id" label="id" width="80"></el-table-column> -->
      <el-table-column prop="name" label="姓名" width="250"></el-table-column>
      <el-table-column prop="title" label="title" width></el-table-column>
      <el-table-column prop="created_at" label="创建时间" width></el-table-column>
      <el-table-column prop="updated_at" label="修改时间" width></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMenu(scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini" @click="delMenu(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="权限" prop="permission">
          <el-cascader
            v-model="form.permission"
            :props="{ checkStrictly:true,multiple:true,value:'id',label:'title',children:'child' }"
            :show-all-levels="true"
            :options="preData"
            clearable
            :getCheckedNodes="true"
            @change="handleChange"
            placeholder="请选择"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户信息" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

  <script>
import { constants } from "crypto";
export default {
  data() {
    return {
      roleData: [],
      dialogVisible: false,
      operating: "",
      preData: [],
      form: {
        name: "",
        title: "",
        permission: [0]
      },
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
        title: [{ required: true, message: "必填", trigger: "blur" }],
        permission: [{ required: true, message: "必填", trigger: "blur" }]
      },
      value: [],
      menuData: []
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
      this.form.permission = value;
    },
    getMenus() {
      this.axios
        .get("/role", {
          // params:{query:'',pagenum:1,pagesize:1}
        })
        .then(res => {
          console.log(res);
          this.roleData = res.data.data;
        });
    },
    getPre() {
      this.axios
        .get("/permission", {
          // params:{query:'',pagenum:1,pagesize:1}
        })
        .then(res => {
          console.log(res);
          this.preData = res.data.data;
        });
    },
    setMenu() {
      let that = this;
      that.$refs.form.validate(v => {
        //v=ture,表单验证通过
        let pre = this.form.permission;
        let preArr = [];
        for (var item in pre) {
          for (var i = 0; i < pre[item].length; i++) {
            preArr.push(pre[item][i]);
          }
        }
        console.log(([...this.form.permission] = new Set(preArr)));
        let operating = this.operating;
        if (v) {
          console.log(that.form);
          if (operating == "post") {
            that.axios
              .post("role", that.form, {
                headers: { "X-Requested-With": "XMLHttpRequest" }
              })
              .then(res => {
                console.log(res);
                that.getMenus();
                that.$message({
                  message: "添加成功",
                  type: "success"
                });
                that.dialogVisible = false;
              })
              .catch(function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                  that.$message.error(error.response.data);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
              });
          }
          if (operating == "put") {
            that.axios
              .put(`role/${this.putId}`, that.form, {
                headers: {
                  "X-Requested-With": "XMLHttpRequest"
                }
              })
              .then(res => {
                console.log(res);
                that.getMenus();
                that.$message({
                  message: "修改成功",
                  type: "success"
                });
                that.dialogVisible = false;
              })
              .catch(function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                  that.$message.error(error.response.data);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
              });
          }
        } else {
          this.$message({
            showClose: true,
            message: "请按照规范填写信息",
            type: "error"
          });
        }
      });
    },
    addMenu() {
      this.dialogVisible = true;
      this.value = "";
      this.operating = "post";
      this.form = {
        name: "",
        title: "",
        permission: []
      };
    },
    async editMenu(row) {
      this.dialogVisible = true;
      this.operating = "put";
      this.putId = row.id;
      this.axios;
      let that = this;
      await this.axios
        .get(`/role/${this.putId}/edit`, {
          // params:{query:'',pagenum:1,pagesize:1}
        })
        .then(res => {
          console.log(res.data.data.permissions);
          that.form = {
            name: row.name,
            title: row.title,
            permission: res.data.data.permissions
          };
        });

      console.log(this.form);
    },
    delMenu(row) {
      console.log(row);
      let that = this;
      this.putId = row.id;
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.axios
            .delete(`role/${this.putId}`, {
              headers: {
                "X-Requested-With": "XMLHttpRequest"
              }
            })
            .then(res => {
              console.log(res);
              that.getMenus();
              that.$message({
                message: "删除成功",
                type: "success"
              });
              that.dialogVisible = false;
            })
            .catch(function(error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                that.$message.error(error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  watch: {},
  created() {
    console.log(this.roleData);
    this.getMenus();
    this.getPre();
  }
};
</script>