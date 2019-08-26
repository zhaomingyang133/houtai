<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules">
      <div class="headpic">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" :plain="true" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      form: {
        name: "benbenxon111112222",
        password: "123456"
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 100, message: "长度在 3 到 100 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "账号或密码错误", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
      login(){
          console.log(this.$refs.form.validate()) //validate element自带属性验证表单通过
          let that = this
          that.$refs.form.validate(v=>{
              if(v){   
                  this.axios.post('login',this.form,{headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(res=>{
                    console.log(res)
                      that.$message({
                      message: '登陆成功',
                      type: 'success'
                    });
                    localStorage.setItem('token',res.data.data.token)
                    
                    that.$router.push('/index')
                    // that.$router.push({name:'Home'}) //也可以通过找name跳转
                  }).catch(function (error) {
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
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
                })
              }else{
                  alert(this.axios)
                  console.log(that)
              }
          })
      }
  },
  components: {}
};
</script>

<style scoped lang='less'>
.login {
  width: 100%;
  height: 100%;
  background-color: #2f4050;
}
.el-form {
  width: 400px;
  padding: 20px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.headpic {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
