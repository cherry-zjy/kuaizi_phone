<template>
  <div class="root">
    <p class="title">月卡查询套餐</p>
    <div class="list">
      <div v-for="(l,i) in price" :key="i" :class="choiceNum == i?'active':''" @click="choiceClick(i,l.price,l.time)">
        <p class="list-yuanjia">￥{{l.yuanjia}}</p>
        <p class="list-price">￥{{l.price}}</p>
        <p class="list-mouth">{{l.time}}个月</p>
      </div>
      <div class="itemempty"></div>
      <div class="itemempty"></div>
    </div>
    <!-- <div class="footer"> -->
    <!-- <div class="tip">小计：￥11231</div> -->
    <mt-button type="primary" class="foot-btn" @click="Record()">购买</mt-button>
    <!-- </div> -->
  </div>
</template>
<script>
  import {
    Toast
  } from 'mint-ui';
  import {
    Indicator
  } from 'mint-ui';
  export default {
    data() {
      return {
        choiceNum: 0,
        url: '',
        buyprice:'29',
        time:'1',
        price:[{
          yuanjia:'58',
          price:'29',
          time:'1'
        },{
          yuanjia:'158',
          price:'79',
          time:'3'
        },{
          yuanjia:'238',
          price:'119',
          time:'6'
        },{
          yuanjia:'398',
          price:'199',
          time:'12'
        }]
      }
    },
    components: {},
    methods: {
      choiceClick(i,price,time) {
        this.choiceNum = i;
        this.buyprice = price
        this.time = time
      },
      getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) {
          return unescape(r[2]);
        } else {
          return null;
        }
      },
      Record() {
        Indicator.open();
        this.$http
          .get("api/User/JiulingOrder", {
            params: {
              appid: getCookie("openid"),
              Token: getCookie("token"),
              Status:this.time,
              price: this.buyprice
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                // Toast(response.data.Result)
                callpay(response.data.Result);
              } else if (status === 40001) {
                Toast(response.data.Result)
                setTimeout(() => {
                  this.$router.push({
                    path: "/Login"
                  });
                }, 1500);
              } else {
                Toast(response.data.Result)
              }
            }.bind(this)
          )
          // 请求error
          .catch(
            function (error) {
              Indicator.close();
              console.log(error)
              Toast('服务器开小差啦，请稍后再试')
            }.bind(this)
          );
      }
    },
    mounted() {
      this.url = window.location.href;
      if (this.url.indexOf("openid") > 0) {
        var openid = this.url.split('openid=')[1];
        setCookie("openid", openid);
      } else {
        if (getCookie("openid")) {
        } else {
          window.location.href =
            "http://api.kuaizijinrong.com/oauth/weixin"
        }
      }
    }
  }

</script>
<style scoped lang=''>
  .title {
    color: #808080;
    margin: 0;
    padding: 1rem 0 0rem 0.5rem;
  }

  .list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .list p {
    margin: 0.8rem 0;
  }

  .list div {
    margin-top: 1rem;
    width: 30%;
    border-radius: 0.5rem;
    text-align: center;
    background-color: #fff;
    border: 1px solid #D7D7D7;
  }

  .list .active {
    border: 1px solid #0b2c8c;
    background-color: #e6ebfb;
  }

  .list-price {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .list-yuanjia{
    text-decoration:line-through
  }

  .list-mouth {
    color: #999999
  }

  .foot-btn {
    position: fixed;
    bottom: 0rem;
    width: 100%;
  }
  .list .itemempty{
    height: 0px;
    width: 30%;
    border: none;
  }

</style>
