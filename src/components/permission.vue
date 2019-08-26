<template>
  <div>
    <el-button @click="addMenu">新增</el-button>
    <el-table
      :data="permenu"
      style="width: 100%"
      :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
      row-key="name"
    >
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
        <el-form-item label="父级菜单" prop v-if="ziMenu">
          <el-cascader
            v-model="form.pid"
            :props="{ checkStrictly: true,value:'id',label:'title',children:'child',emitPath:false }"
            :show-all-levels="false"
            :options="permenu"
            clearable
            @change="handleChange"
            placeholder="不选择默认为一级菜单"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户信息" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="地址url" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="form.is_show" :label="0">打开</el-radio>
          <el-radio v-model="form.is_show" :label="1">关闭</el-radio>
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
export default {
  data() {
    return {
      permenu: [],
      dialogVisible: false,
      ziMenu: false,
      operating: "",
      form: {
        name: "",
        title: "",
        url: "",
        is_show: 0,
        pid: 0
      },
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
        title: [{ required: true, message: "必填", trigger: "blur" }],
        url: [{ required: true, message: "必填", trigger: "blur" }]
      },
      value: [],
      menuData: []
    };
  },
  methods: {
    handleChange(value) {
      console.log((this.form.pid = value));
      // console.log((this.form.pid *= value[value.length - 1]));
    },
    getMenus() {
      this.axios
        .get("/permission", {
          // params:{query:'',pagenum:1,pagesize:1}
        })
        .then(res => {
          console.log(res);
          this.permenu = res.data.data;
        });
    },
    setMenu() {
      let that = this;
      that.$refs.form.validate(v => {
        //v=ture,表单验证通过
        let operating = this.operating;
        if (v) {
          console.log(that.form);
          if (operating == "post") {
            that.axios
              .post("permission", that.form, {
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
                that.ziMenu = false;
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
              .put(`permission/${this.putId}`, that.form, {
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
                that.ziMenu = false;
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
      this.ziMenu = true;
      this.value = "";
      this.operating = "post";
      this.form = {
        name: "",
        title: "",
        url: "",
        is_show: 0,
        pid: 0
      };
    },
    editMenu(row) {
      this.dialogVisible = true;
      this.operating = "put";
      this.putId = row.id;
      this.form = {
        name: row.name,
        title: row.title,
        url: row.url,
        is_show: row.is_show,
        pid: row.pid
      };
      console.log(row);
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
            .delete(`permission/${this.putId}`, {
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
              that.ziMenu = false;
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
  watch: {
    dialogVisible: function(v) {
      if (!v) {
        this.ziMenu = v;
      }
    }
  },
  created() {
    console.log(this.permenu);
    this.getMenus();
  }
};
</script>