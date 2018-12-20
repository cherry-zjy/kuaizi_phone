<template>
  <div class="page-cell">
    <mt-swipe :auto="4000" id="banner">
      <mt-swipe-item><img src="../../assets/banner.png"></mt-swipe-item>
      <mt-swipe-item><img src="../../assets/banner_1.png"></mt-swipe-item>
    </mt-swipe>
    <mt-field placeholder="请输入18位VIN码" class="vin" v-model="vin" @mouseleave.native='getInfo'>
      <img src="../../assets/photo.png" class="phonticon">
      <input id="image" type="file" name="file" accept="image/*" v-on:change="SetMayImg0($event)" class="fileimg">
    </mt-field>
    <!-- <p class="title">上传需要查询资料的行驶证</p>
    <div class="imgbox">
      <img :src="imgurl" class="upload" id="car" v-if="imgurl">
      <img src="../../assets/upload.png" class="upload" v-if="!imgurl">
      <input id="image" type="file" name="file" accept="image/*" v-on:change="SetMayImg0($event)" class="fileimg">
    </div> -->
    <p class="title">车辆相关信息</p>
    <!-- <mt-field disableClear label="VIN码" placeholder="请输入VIN码查询" v-model="vin"></mt-field> -->
    <mt-cell title="排放标准" :value="list.model_emission_standard"></mt-cell>
    <mt-cell title="车型ID" :value="list.model_id"></mt-cell>
    <mt-cell title="车辆品牌名" :value="list.brand_name"></mt-cell>
    <mt-cell title="车系名称" :value="list.series_name"></mt-cell>
    <mt-cell title="车型年款" :value="list.model_year"></mt-cell>
    <mt-cell title="品牌ID" :value="list.brand_id"></mt-cell>
    <mt-cell title="变速箱类型" :value="list.model_gear"></mt-cell>
    <mt-cell title="排量" :value="list.model_liter"></mt-cell>
    <!-- <mt-cell title="车型名称" :value="list.brand_name"></mt-cell> -->
    <mt-cell title="车系ID" :value="list.series_id"></mt-cell>
    <mt-cell title="车型指导价" :value="list.model_price"></mt-cell>
    <mt-cell title="最小上牌年份" :value="list.min_reg_year"></mt-cell>
    <mt-cell title="最大上牌年份" :value="list.max_reg_year"></mt-cell>
    <!-- <mt-cell title="映射车型ID" :value="list.brand_name"></mt-cell> -->
    <div class="foot-btn">
      <mt-button type="primary" @click="query()">车辆估值</mt-button>
      <mt-button type="primary" @click="query1()">维保查询</mt-button>
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
        list: {},
        vin: '',
        engine_no:''
      };
    },
    watch: {
      vin: function (n, o) {
        if (n !== '') {
          this.getInfo()
        }
      },
    },
    mounted() {
      if (getCookie("token") == undefined || getCookie("token") == null) {
        this.$router.push("/Login");
        return;
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
      // this.getInfo()
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
                _this.imgScale0(base64, 0.5)
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
                this.engine_no = response.data.data.engine_num
                console.log(this.list.engine_no)
                this.vin = response.data.data.vin
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
        if (this.vin == '') {
          Toast('请输入vin码')
          return;
        }
        this.$router.push("/CarImage?vin=" + this.vin);
      },
      query1() {
        if (this.vin == '') {
          Toast('请输入vin码')
          return;
        }
        this.$router.push("/MaintenanceImage?vin=" + this.vin + "&engine=" + this.engine_no);
      },
      getInfo() {
        Indicator.open();
        this.$http
          .get("api/Back/Carvin", {
            params: {
              vin: this.vin,
              Token: getCookie("token"),
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result
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

  .choose {
    position: absolute;
    top: 0;
    right: 50px;
  }

  .choose-btn {
    color: #656b79;
    background-color: #ffffff;
    -webkit-box-shadow: 0 0 1px #ffffff;
    box-shadow: 0 0 1px #ffffff;
  }

  .area-class {
    width: 100%;
  }

  .imgbox {
    position: relative;
  }

  .imgbox img {
    width: 100px;
    height: 100px;
  }

  .fileimg {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .foot-btn {
    margin-top: 10px;
    width: 100%
  }

  .foot-btn button {
    width: 46%;
    margin-left: 2%;
  }

  .imgbox {
    position: relative;
  }

  .imgbox img {
    width: 98%;
    margin-left: 1%;
    height: 10rem;
  }

  .fileimg {
    position: absolute;
    height: 1.6rem;
    top: 0;
    opacity: 0;
  }

  .title {
    margin-left: 5%;
    color: #808080
  }

  .mint-swipe {
    height: 13rem;
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }

  .phonticon {
    width: 1.6rem;
    padding-left: 1rem;
    border-left: 1px solid #666666
  }

  .vin {
    margin-top: 1.2rem
  }

</style>
