<template>
  <div class="root">
    <!-- 顶部用户信息 -->
    <div class="bjbox">
      <!-- <img src="../../assets/wode_bg.png" class="bjimg"/> -->
    </div>
    <div class="userInfo">
      <div class="userImg">
        <img src="../../assets/logo.png" alt="" class="user-img">
        <span class="username">用户名</span>
        <mt-button type="primary" size="small" @click="query()" class="list-mouth">开通月卡</mt-button>
      </div>
    </div>
    <div class="line"></div>
    <!-- 查询记录 -->
    <div class="list">
      <div class="padding">
      <div class="forList" v-for="(l,i) in 5" :key="i">
        <div class="listBox">
          <div class="left">
            
            <div class="ordermsg">
              <p>车辆估值</p>
              <p>按此查询</p>
              <p>时间</p>
            </div>
            <div class="orderno">订单号：0000000</div>
          </div>
          <div class="right"><span>查看</span></div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    components: {},
    methods: {},
    mounted() {}
  }

</script>
<style scoped lang=''>
  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .clear {
    clear: both;
  }

  .userInfo {
    width: 90%;
    background-color: #fff;
    margin-bottom: 20px;
    margin-top: -8%;
    margin-left: 5%;
  }

  .userInfo .left img {
    width: 60px;
    height: 60px;
    margin-top: 30px;
  }

  .userName {
    vertical-align: middle;
  }

  .mouth {
    margin-right: 10%
  }

  .line {
    width: 100%;
    height: 20px;
    background-color: #efefef;
  }

  /* list */
  .list {
    background-color: #fff;
    width: 90%;
    background-color: #fff;
    margin-bottom: 20px;
    margin-top: -8%;
    margin-left: 5%;
  }

  .list h3 {
    font-size: 16px;
    line-height: 48px;
  }

  .listBox {
    border-bottom: 1px solid #EEEEEE;
    padding: 1rem 0;
  }

  .listBox .left {
    width: 70%;
  }

  .listBox .left div {
    line-height: 30px;
  }

  .ordermsg {
    display: flex;
    justify-content: space-between;
  }

  .listBox .right {
    width: 30%;
    text-align: right;
  }

  .listBox .right span {
    display: inline-block;
    padding: 3px 10px;
    margin-top: 1rem;
    border-radius: 5px;
    border: 1px solid #0B2C8C;
    color: #0B2C8C;
    background-color: #fff;
  }

  .bjbox {
    background-image: url(../../assets/wode_bg.png);
    background-size: 100% 100%;
    height: 5rem;
  }

  .bjimg {
    /* position: fixed; */
    z-index: 1;
    /* height: 5rem; */
    width: 100%;
  }

  .user-img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    vertical-align: middle;
  }

  .userImg {
    padding: 1rem;
    position: relative;
  }

  .list-mouth {
    position: absolute;
    right: 2rem;
    top: 2.5rem;
  }
  .padding{
    padding: 1rem;
  }
  .ordermsg p{
    margin: 0.5rem 0;
  }
  .orderno{
    color: #999999;
    font-size: 1rem;
  }

</style>
