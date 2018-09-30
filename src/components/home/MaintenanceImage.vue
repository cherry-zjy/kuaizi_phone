<template>
  <div class="page-cell">
    <p class="title">上传需要查询资料的行驶证</p>
    <div class="imgbox">
      <img src="../../assets/upload.png" class="upload">
      <input type="file" name="file" v-on:change="addimg($event)" class="fileimg">
    </div>
    <p class="title">输入查询车辆相关信息</p>
    <mt-field disableClear label="发动机号" placeholder="请输入发动机号" v-model="list.engine_no"></mt-field>
    <div class="foot-btn">
      <mt-button type="primary" @click="query()">确认</mt-button>
      <!-- <mt-button type="primary" size="small" @click="query()">单次查询</mt-button> -->
      <!-- <mt-button type="primary" size="small" @click="query()">月卡查询</mt-button> -->
    </div>
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
    data: function () {
      return {
        list: {
          engine_no:''
        },
      };
    },
    mounted() {},
    methods: {
      addimg(e) { //添加图片
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        } else {
          var formData = new FormData();
          formData.append('file', files[0]);
        }
      },
      query() {
        for (var key in this.list) {
          if (this.list[key] == '' || this.city == '') {
            Toast('请完善信息')
            return;
          }
        }
        Indicator.open();
        this.$http
          .get("api/Back/GetWB", {
            params: {
              engine_no: this.list.engine_no,
              token: getCookie("token"),
              vin: '1G6A95RX3E0128766',
              Token: getCookie("token"),
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                window.location.href = response.data.Result.url
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
.imgbox img {
    width: 96%;
    margin-left: 2%;
    height: 10rem;
  }

  .fileimg {
    position: absolute;
    width: 96%;
    height: 10rem;
    top: 0;
    left: 2%;
    opacity: 0;
  }

  .foot-btn {
    position: fixed;
    bottom: 0rem;
    width: 100%
  }

  .foot-btn button {
    width: 100%
  }
  .title{
    margin-left: 2%;
    color: #808080
  }
</style>
