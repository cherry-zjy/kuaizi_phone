<template>
  <div class="root editPsw" :style="'min-height:'+allHeight +'px'">
    <div class="form">
      <mt-field class="underLine" label="手机号" placeholder="请输入手机号码" type="number" v-model="phone"></mt-field>
      <mt-field label="验证码" v-model="captcha">
        <mt-button type="primary" size="small" @click="query()">发送验证码</mt-button>
      </mt-field>
    </div>
    <div class="btn">
      <mt-button type="primary" size="small" @click="loginIn()">登录</mt-button>
    </div>
  </div>
</template>
<script>
  // import md5 from 'js-md5'
  import {
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {
        allHeight: 0,
        phone: '',
        password: '',
        code: ''
      }
    },
    components: {
      Toast
    },
    methods: {
      loginIn() {
        this.$http.post('/api/User/LoginByPhoneAndPwd', {
            'Phone': this.phone,
            'Pwd': this.password
          })
          .then(res => {
            Toast('登录成功')
            localStorage.setItem('token', res.Result)
            this.setCookie('token', res.Result)
            this.$store.state.token = res.Result
            // var _this = this
            setTimeout(() => {
              // _this.$router.push('/')
              this.goFirstURL()
            }, 2000)
          })
      }
    },
    mounted() {
      console.log(this.$route)
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
