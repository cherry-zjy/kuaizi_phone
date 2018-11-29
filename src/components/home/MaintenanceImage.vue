<template>
  <div class="page-cell">
    <p class="title">上传需要查询资料的行驶证</p>
    <div class="imgbox">
      <img :src="imgurl" class="upload" id="car" v-if="imgurl">
      <img src="../../assets/upload.png" class="upload" v-if="!imgurl">
      <input id="image" type="file" name="file" accept="image/*" v-on:change="SetMayImg0($event)" class="fileimg">
    </div>
    <p class="title">输入查询车辆相关信息</p>
    <mt-field disableClear label="发动机号" placeholder="请输入发动机号" v-model="list.engine_no"></mt-field>
    <mt-field disableClear label="VIN码" placeholder="请输入VIN码" v-model="list.vin"></mt-field>
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
          engine_no: '',
          vin: ''
        },
      };
    },
    mounted() {
      if(window.location.href.split("?vin=")[1]){
        this.list.vin = window.location.href.split("?vin=")[1].split("&engine=")[0]
        this.list.engine_no = window.location.href.split("?vin=")[1].split("&engine=")[1]
        // this.getInfo()
      }
    },
    methods: {
      SetMayImg0(e) {
        var tag = e.target;
        var fileList = tag.files;
        var _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onload = function () {
          var oReader = new FileReader();
          oReader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
              var expectWidth = this.naturalWidth;
              var expectHeight = this.naturalHeight;
              if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                expectWidth = 800;
                expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
              } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                expectHeight = 1200;
                expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
              }

              //canvas 绘制图片 
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              canvas.width = expectWidth;
              canvas.height = expectHeight;
              ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
              var base64 = null;
              base64 = canvas.toDataURL("image/jpeg", 0.5);
              if (fileList[0].size / 1572864 > 1) {
                _this.imgScale0(base64, 0.8)
              } else {
                //ajax请求，通过formdata进行上传图片 
                var formdata = new FormData();
                // var blob = _this.dataURItoBlob(base64);
                // formdata.append('file', blob, 'image.png');
                _this.imgurl = base64
                _this.driveData = base64.split("base64,")[1]
                _this.next()
                // $.ajax({
                //   type: 'post',
                //   url: urlf + "/api/Photo/UpdateForImage?type=0",
                //   data: formdata,
                //   cache: false,
                //   processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                //   contentType: false, // 不设置Content-type请求头
                //   success: function (data) {
                //     if (data.Status == 1) {
                //       $(".MeImg0").attr("src", base64)
                //       _this.PirceImage = data.Result[0]
                //       _this.numPriceImg = 1
                //       bus.$emit("PirceImage", _this.PirceImage)
                //     } else {
                //       alert(data.Result)
                //     }
                //   }.bind(_this)
                // })
              }
            };
          };
          oReader.readAsDataURL(fileList[0]);
        }
      },
      //缩放图片，防止图片宽高过大 
      imgScale0(imgUrl, quality) {
        var img = new Image();
        var _this = this;
        var canvas = document.createElement('canvas');
        var cxt = canvas.getContext('2d');
        img.src = imgUrl;
        img.onload = function () {
          //缩放后图片的宽高
          var width = img.naturalWidth / quality;
          var height = img.naturalHeight / quality;
          canvas.width = width;
          canvas.height = height;
          cxt.drawImage(this, 0, 0, width, height);
          //ajax请求，通过formdata进行上传图片 
          // var formdata = new FormData();
          // var blob = dataURItoBlob(canvas.toDataURL('image/jpeg'));
          // formdata.append('file', blob, 'image.png');
          _this.imgurl = canvas.toDataURL('image/jpeg')
          _this.driveData = canvas.toDataURL('image/jpeg').split("base64,")[1]
          console.log(_this.driveData)
          _this.next()
        }
      },
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
            // if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
            //       alert( '上传失败，请上传不大于2M的图片！');
            //       return;
            // }else{
            // document.getElementById('image').src=this.result;
            //执行上传操作
            $(".upload").attr('src', this.result)
            tt.driveData = reader.result.split("base64,")[1]
            tt.next()
            // }
          }
        }
      },
      next() {
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
                this.list.vin = response.data.data.vin
              } else {
                Toast(response.data.error_msg)
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
              vin: this.list.vin,
              Token: getCookie("token"),
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                window.location.href = response.data.Result
              } else if (status === 2) {
                Toast(response.data.Result)
                setTimeout(() => {
                  this.$router.push({
                    path: "/mine"
                  });
                }, 1500);
              } else if (status === 40001) {
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

  .title {
    margin-left: 5%;
    color: #808080
  }

</style>
