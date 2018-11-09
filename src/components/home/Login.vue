<template>
  <div class="root editPsw" :style="'min-height:'+allHeight +'px'">
    <div class="form login">
      <mt-field class="underLine" label="手机号" placeholder="请输入手机号码" type="number" v-model="phone"></mt-field>
      <mt-field label="验证码" v-model="password" type="number">
        <mt-button plain type="primary" size="small" @click="fcode()" :disabled="disabled">{{time}}</mt-button>
      </mt-field>
    </div>
    <div class="btn">
      <mt-button type="primary" @click="loginIn()">登录</mt-button>
    </div>
  </div>
</template>
<script>
  // import md5 from 'js-md5'
  import {
    Toast,
    Indicator
  } from 'mint-ui';
  import qs from "qs";
  export default {
    data() {
      return {
        allHeight: 0,
        phone: '',
        password: '',
        code: '',
        currentTime: 61,
        time: '获取验证码', //倒计时 
        disabled: false
      }
    },
    components: {
      Toast
    },
    methods: {
      loginIn() {
        Indicator.open();
        this.$http
          .post(
            "api/User/Register",
            qs.stringify({
              Phone: this.phone,
              Pwd: -1,
              Code: this.password,
              Lng: -1,
              Lat: -1,
              ID: "-1"
            })
          )
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                setCookie("token", response.data.Result);
                Toast({
                  message: '登录成功',
                  iconClass: 'icon icon-success'
                });
                setTimeout(() => {
                  this.$router.push('/')
                }, 1000);
              } else {
                Indicator.close();
                Toast(response.data.Result)
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
              Indicator.close();
              Toast('服务器开小差啦，请稍后再试')
            }.bind(this)
          );
      },
      fcode() {
        if (this.time == "获取验证码" || this.time == "重新发送") {
          if (this.phone == '') {
            Toast('请输入手机号')
            return false;
          } else {
            Indicator.open();
            this.$http
              .get("api/VerifyCode/Send", {
                params: {
                  phone: this.phone,
                }
              })
              .then(
                function (response) {
                  Indicator.close();
                  var status = response.data.Status;
                  if (status === 1) {
                    this.getCode();
                    this.disabled = true
                    Toast({
                      message: '发送成功',
                      iconClass: 'icon icon-success'
                    });
                  } else {
                    Indicator.close();
                    Toast(response.data.Result)
                  }
                }.bind(this)
              )
              // 请求error
              .catch(
                function (error) {
                  console.log(error)
                  Indicator.close();
                  Toast('服务器开小差啦，请稍后再试')
                }.bind(this)
              );
          }
        }
      },
      getCode() {
        var that = this
        var currentTime = that.currentTime
        var interval = setInterval(function () {
          currentTime--;
          that.time = currentTime + '秒'
          if (currentTime <= 0) {
            clearInterval(interval)
            that.time = '重新发送',
              that.currentTime = 61,
              that.disabled = false
          }
        }, 1000)
      }
    },
    mounted() {
      // console.log(this.$route)
      this.allHeight = document.documentElement.clientHeight
    }
  }

</script>
<style scoped lang='scss'>
  .root {
    background-color: #faf9f7;
    padding-top: 0.265rem;

    .form {

      // margin-top: 10%;
      .underLine {
        border-bottom: 1px solid #e6e6e6;
      }
    }

    .btn {
      margin-top: 1.8rem;
      padding: 0 0.265rem;

      button {
        width: 100%;
        text-align: center;
        color: #fff;
      }
    }
  }

</style>
