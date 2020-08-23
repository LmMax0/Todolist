<template>
  <el-card class="box-card out-mcard">
  <div>
    用户名:
    <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    <br><br>
    密码:
    <el-input type="password" v-model="loginForm.password" placeholder="请输入用户名"></el-input>
    <br><br>
    <el-button type="primary" v-on:click="login" round>登录</el-button>
  </div>
  </el-card>
</template>

<script>
  export default {
    name: "LogIn",
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login:function () {
        let _this=this;
        this.$axios
            .post('/api/login', {
              username: this.loginForm.username,
              password: this.loginForm.password
            })
            .then(function (response) {
              let response_data =  response.data;
              // console.log(response_data[0].id);
              if(response_data[1].code ===400)
                alert("密码或账号错误，请重新输入")
              else{
                _this.$store.state.userid = response_data[0].id;
                _this.$router.replace({path:'/todolist'})
              }
            })
            .catch(function (error) {
                console.log(error);
            });
      }
    }
  }
</script>

<style scoped>
  .out-mcard{
    margin: 100px auto;
    width: 400px;
  }
</style>