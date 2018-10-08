<template>
  <div class="page-cell">
    <p class="title">上传需要查询资料的行驶证</p>
    <div class="imgbox">
      <img src="../../assets/upload.png" class="upload">
      <input id="image" type="file" name="file" v-on:change="addimg($event)" class="fileimg">
    </div>
    <p class="title" v-if="show">输入查询车辆相关信息</p>
    <mt-field v-if="show" disableClear label="发动机号" placeholder="请输入发动机号" v-model="list.engine_no"></mt-field>
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
  import qs from "qs";
  export default {
    data: function () {
      return {
        list: {
          engine_no:''
        },
        show:false
      };
    },
    mounted() {},
    methods: {
      addimg(e) { //添加图片
      var tt = this;
        var reader = new FileReader();
        var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var file = $("#image")[0].files[0];
        var imgUrlBase64;
        if (file) {
            //将文件以Data URL形式读入页面  
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = function (e) {
              //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
              if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                    alert( '上传失败，请上传不大于2M的图片！');
                    return;
                }else{
                  // document.getElementById('image').src=this.result;
                    //执行上传操作
                    $(".upload").attr('src',this.result)
                    tt.driveData = reader.result.split("base64,")[1]
                    tt.next()
                }
            }
         } 
      },
      next(){
        Indicator.open();
        this.$http
          .post("http://testapi.che300.com/service/common/eval",
            qs.stringify({
              token: 'd68de345203ea3fbded45a637fbab3bd',
              oper: 'identifyDriverCard',
              driveData: this.driveData
            })
          )
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.status;
              if (status === 1) {
                this.list.car_no = response.data.data.plate_num
                this.list.engine_no = response.data.data.engine_num
                this.show = true
              }else {
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
