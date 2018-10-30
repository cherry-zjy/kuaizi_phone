<template>
  <div class="root">
    <!-- 顶部用户信息 -->
    <div class="bjbox">
      <!-- <img src="../../assets/wode_bg.png" class="bjimg"/> -->
    </div>
    <div class="userInfo">
      <div class="userImg">
        <img :src="mainurl+icon" alt="" class="user-img">
        <span class="username">{{UserName}}</span>
        <mt-button type="primary" size="small" @click="query()" class="list-mouth">开通月卡</mt-button>
      </div>
    </div>
    <div class="line"></div>
    <!-- 查询记录 -->
    <div class="list">
      <div class="padding">
      <div class="forList" v-for="(item,index) in list" :key="index">
        <div class="listBox">
          <div class="left">
            <div class="ordermsg">
              <p>按次购买</p>
              <p v-if="item.Type == 0" class="baoxain">保险订单</p>
              <p v-if="item.Type == 1" class="weibao">维保订单</p>
              <p v-if="item.Status == 1" class="baoxain">成功</p>
              <p v-if="item.Status == 0" class="weibao">查询中</p>
            </div>
            <div class="orderno">订单号：{{item.Order}}</div>
          </div>
          <div class="right"><span @click="Detail(item.Order,item.Type)">查看</span></div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        list:[],
        icon:'',
        UserName:'',
        mainurl:''
      }
    },
    mounted() {
      this.mainurl = mainurl
      if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
      this.getInfo()
      this.getUserInfo()
      // this.getUserInfo()
    },
    methods: {
      getInfo() {
        Indicator.open();
        this.$http
          .get("api/Back/OrderList", {
            params: {
              Token: getCookie("token"),
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result
              }else if(status === 40001){
                Toast(response.data.Result)
                setTimeout(() => {
                  this.$router.push({
                    path: "/Login"
                  });
                }, 1500);
              } else {
                Indicator.close();
                Toast(response.data.Result)
              }
            }.bind(this)
          )
          // 请求error
          .catch(
            function (error) {
              Indicator.close();
              Toast('服务器开小差啦，请稍后再试')
            }.bind(this)
          );
      },
      getUserInfo() {
        Indicator.open();
        this.$http
          .get("api/User/Info?Token="+getCookie("token"), {
            
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                this.icon = response.data.Result.Image
                this.UserName = response.data.Result.NickName
              }else if(status === 40001){
                Toast(response.data.Result)
                setTimeout(() => {
                  this.$router.push({
                    path: "/Login"
                  });
                }, 1500);
              } else {
                Indicator.close();
                Toast(response.data.Result)
              }
            }.bind(this)
          )
          // 请求error
          .catch(
            function (error) {
              // console.log(error)
              Indicator.close();
              Toast('服务器开小差啦，请稍后再试')
            }.bind(this)
          );
      },
      query(){
        this.$router.push("/Buy");
      },
      Detail(id,type){
        if(type == 0){
          this.url = 'api/Back/OrdertoInsurance'
        }else{
          this.url = 'api/Back/OrdertoWB'
        }
        Indicator.open();
        this.$http
          .get(this.url, {
            params: {
              order_no: id,
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                window.location.href = response.data.Result
              } else {
                Indicator.close();
                Toast(response.data.Result)
              }
            }.bind(this)
          )
          // 请求error
          .catch(
            function (error) {
              Indicator.close();
              Toast('服务器开小差啦，请稍后再试')
            }.bind(this)
          );
      }
    },
    
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

  .listBox .left div {
    line-height: 30px;
  }

  .ordermsg {
    display: flex;
    justify-content: space-between;
  }

  .listBox .right {
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
  .baoxain{
    font-size: 0.8rem;
    color: darkcyan
  }
  .weibao{
    font-size: 0.8rem;
    color:firebrick
  }

</style>
