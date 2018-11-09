<template>
  <div class="hello">
    <mt-swipe :auto="4000">
      <mt-swipe-item><img src="../../assets/banner.png"></mt-swipe-item>
      <mt-swipe-item><img src="../../assets/banner_1.png"></mt-swipe-item>
    </mt-swipe>
    <div class="row">
      <p>查询</p>
      <div class="box">
        <div class="col-6" @click="Car()">
          <img src="../../assets/guzhi.png">
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
    <div class="foot-btn">
      <mt-button type="primary" @click="goto('/mine')">我的订单</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {};
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

  .row {
    background-color: #fff;
    float: left;
  }

  .row p:first-child {
    color: #808080;
    padding-left: 1rem;
  }
  .row .box{
    float: left;
    border: 0.2px solid #E0E0E0;
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
    width: 50%;
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
