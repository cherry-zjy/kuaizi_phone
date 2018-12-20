<template>
  <div class="hello" style="float:left">
    <mt-swipe :auto="4000" id="banner">
      <mt-swipe-item><img src="../../assets/banner.png"></mt-swipe-item>
      <mt-swipe-item><img src="../../assets/banner_1.png"></mt-swipe-item>
    </mt-swipe>
    <div class="row">
      <p>查询</p>
      <div class="box">
        <div class="col-6" @click="Car()">
          <img src="../../../src/assets/guzhi.png">
          <p>车辆估值</p>
        </div>
        <div class="col-6" @click="goto('/Result')">
          <img src="../../assets/vin.png">
          <p>VIN查询</p>
        </div>
        <div class="col-6" @click="Insurance()">
          <img src="../../assets/baoxian.png">
          <p>保险查询</p>
        </div>
        <div class="col-6" @click="Maintenance()">
          <img src="../../assets/weibao.png">
          <p>维保查询</p>
        </div>
      </div>
    </div>
    <div class="foot-btn" v-if="scrol">
      <mt-button type="primary" @click="goto('/mine')">我的订单</mt-button>
    </div>
    <div class="foot-btn-scrol" v-if="!scrol">
      <mt-button type="primary" @click="goto('/mine')">我的订单</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        scrol:false
      };
    },
    mounted(){
      console.log(document.body.scrollHeight)
      console.log(window.innerHeight)
      if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)){
        this.scrol = true
      }
      const that = this;
      that.clientWight = `${window.innerWidth}`;
      console.log(that.clientWight * 0.4)
      document.getElementById('banner').setAttribute('style', 'height: ' + that.clientWight * 0.43 + 'px');
      window.onresize = function temp() {
        that.clientWight = `${window.innerWidth}`;
        console.log(that.clientWight * 0.4)
        document.getElementById('banner').setAttribute('style', 'height: ' + that.clientWight * 0.43 + 'px');
      };
    },
    methods: {
      // Record(){
      //   this.$router.push("/QueryRecord");
      // },
      Car() {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
        this.$router.push("/CarImage");
      },
      Insurance() {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
        this.$router.push("/InsuranceImage");
      },
      Maintenance() {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
        this.$router.push("/MaintenanceImage");
      },
      goto(url) {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
        this.$router.push(url);
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .foot-btn {
    float: left;
    margin-top: 2rem;
    width: 100%;
  }

  .foot-btn button {
    width: 100%
  }

  .mint-swipe {
    height: 13rem;
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
  .foot-btn-scrol{
    position: absolute;
    width: 100%;
    bottom: 0
  }

  .foot-btn-scrol button {
    width: 100%
  }

  .row {
    float: left;
    width: 100%;
  }
  .col-6 p{
    margin-top: 0.5rem
  }

  .row p:first-child {
    color: #808080;
    padding-left: 5%;
  }
  .row .box{
    float: left;
    width: 90%;
    border: 0.2px solid #E0E0E0;
    margin-left: 5%;
    background-color: #fff;
  }

  .col-6 {
    color: #808080;
    padding-top: 16px;
    width: 50%;
    box-sizing: border-box;
    float: left;
    text-align: center
  }

  .col-6 img {
    width: 40%;
  }
  .col-6:first-child{
    border-right: 0.2px solid #E0E0E0;
    border-bottom: 0.2px solid #E0E0E0;
  }
  .col-6:nth-child(2){
    border-bottom: 0.2px solid #E0E0E0;
  }
  .col-6:nth-child(3){
    border-right: 0.2px solid #E0E0E0;
  }

</style>
