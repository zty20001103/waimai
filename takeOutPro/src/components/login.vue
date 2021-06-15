<template>
    <div>
      <van-nav-bar
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
      <div>
        <h1>硅谷外卖</h1></div>

      <van-tabs v-model="active">
        <!--      登陆 表单-->
        <van-tab title="登陆">
          <div class="login" >
            <van-form >
              <van-field
                v-model="username"
                name="用户名"
                placeholder="用户名"
              />
              <van-field
                v-model="password"
                :type="inputText"
                name="密码"
                placeholder="密码"
              >
                <template #right-icon>
                  <van-switch v-model="checked" size="20" @change="loginInput"/>
                </template>

              </van-field>

              <div style="margin: 16px;">
                <van-button round block type="primary" @click="CkickLogin"  native-type="submit" style="width: 70%;margin: auto">提交</van-button>
              </div>
            </van-form>
          </div  >
        </van-tab>

        <!--      注册  表单-->
        <van-tab title="注册">
          <div class="login" >
            <van-form >
              <van-field
                v-model="username2"
                name="用户名"
                placeholder="手机/邮箱/用户名"
              />
              <van-field
                v-model="password2"
                :type="inputText2"
                name="密码"
                placeholder="密码"
              >
                <template #right-icon>
                  <van-switch v-model="checked2" size="20" @change="registerInput"/>
                </template>
              </van-field>

              <van-field
                v-model="fullname"
                name="姓名"
                placeholder="输入您的姓名"
              />

              <div style="margin: 16px;">
                <van-button round block @click="ClickRegister" type="primary"  native-type="submit" style="width: 70%;margin: auto">提交</van-button>
              </div>
            </van-form>

          </div>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
  import { Toast,Form,Field,Switch } from 'vant';
  import {mapMutations} from "vuex"
    export default {
        name: "Login",
        props:['name'],
        data(){
          return{
            username: '',
            password: '',
            username2: '',
            password2: '',
            fullname:'',
            checked:false,
            checked2:false,
            inputText :"password",
            inputText2 :"password",
            active:2,
          }
        },
      methods:{
          ...mapMutations(['mutationsLogin']),
        loginInput(){   //登录页面的密码框的显示与隐藏
            if (this.checked){
                this.inputText='text';
            }else{
              this.inputText='password';
            }
          },
        registerInput(){
          if (this.checked2){   //注册页面的密码框的显示与隐藏
            this.inputText2='text';
          }else{
            this.inputText2='password';
          }
        },
        onClickLeft(){   //返回上一级路由
          this.$router.go(-1)
        },
        CkickLogin(){   //登陆按钮事件   获取用户名和密码，发送ajax
          var app = this
          this.$http.post("/user/login",{
            "account":this.username,
            "password":this.password
          }).then(function (res) {
            console.log(res.data)
            if (res.data==""){
              alert("用户名或密码不正确")
            }else{
                app.mutationsLogin(res.data)   //登陆成功后，保存数据到state
              localStorage.setItem("allname", JSON.stringify(res.data))
              window.localStorage.setItem("loingStateus",true);
              window.localStorage.setItem("account",res.data.account);
              window.localStorage.setItem("name",res.data.name);
              app.$router.push('/home')
            }
          })
        },
        ClickRegister(){      //注册
          this.$http.post("/user/register",{
            "account":this.fullname,
              "password":this.password2,
              "name":this.username2
          }).then(function (res) {
            console.log(res.data)
            if (res.data=="register success"){
              alert("注册成功,前去登录")
              history.go(0)
            };
            if (res.data=="register fail"){
              alert("抱歉，注册失败")
            };
            if (res.data=="account is exit"){
              alert("用户已存在")
            }
          })
        }
      }

    }
</script>

<style scoped>
  h1{
    margin-top: 100px;
    margin-bottom: 30px;
    color: #29A774;
  }
  .login{
      margin-top: 20px;
  }
.van-field{
    margin: auto;
    width: 80%;
    margin-bottom: 20px;
    line-height: 20px;
    border: 2px solid #ebedf0 ;
  }
</style>
