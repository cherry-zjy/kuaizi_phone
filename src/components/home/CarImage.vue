<template>
  <div class="page-cell">
    <div v-if="!choose">
      <p class="title">上传需要查询资料的行驶证</p>
      <div class="imgbox">
        <img :src="imgurl" class="upload" id="car" v-if="imgurl">
        <img src="../../assets/upload.png" class="upload" v-if="!imgurl">
        <input id="image" type="file" name="file" accept="image/*" v-on:change="SetMayImg0($event)" class="fileimg">
      </div>
      <p class="title">输入查询车辆相关信息</p>
      <mt-field disableClear label="VIN码" placeholder="请输入VIN码" v-model="vin"></mt-field>
      <mt-cell title="车型" :value="list.modelid" is-link @click.native="handlerArea1"></mt-cell>
      <mt-cell title="省市" :value="list.zone" is-link @click.native="handlerArea"></mt-cell>
      <mt-cell title="上牌日期" :value="list.regDate" is-link @click.native="open()"></mt-cell>
      <mt-field disableClear label="行驶里程（万公里）" type="number" placeholder="行驶里程" v-model="list.mile"></mt-field>
      <div class="foot-btn">
        <mt-button type="primary" @click="query()">确认</mt-button>
      </div>
    </div>
    <div v-if="choose">
      <div v-if="areaVisible1">
        <mt-header title="选择车辆品牌">
          <mt-button icon="back" slot="left" @click="cancelAddressChange1()">返回</mt-button>
        </mt-header>
        <mt-index-list>
          <mt-index-section :index="item" v-for="item in addressSlots1" :key="item">
            <mt-cell :title="items.Brand_Name" v-for="items in brand" :key="items" v-if="items.Brand_initial==item"
              @click.native="onAddressChange1(items)"></mt-cell>
          </mt-index-section>
        </mt-index-list>
      </div>
      <div v-if="areaVisible2">
        <mt-header title="选择车系">
          <mt-button icon="back" slot="left" @click="cancelAddressChange2()">返回</mt-button>
        </mt-header>
        <mt-cell v-for="item in addressSlots2" :key="item" :title="item.Series_Name" @click.native="onAddressChange2(item)"></mt-cell>
      </div>
      <div v-if="areaVisible3">
        <mt-header title="选择车型">
          <mt-button icon="back" slot="left" @click="cancelAddressChange3()">返回</mt-button>
        </mt-header>
        <mt-cell v-for="item in addressSlots3" :key="item" :title="item.Model_Name" @click.native="onAddressChange3(item)"></mt-cell>
      </div>
      <div v-if="areaVisible">
        <mt-header title="选择省份">
          <mt-button icon="back" slot="left" @click="cancelAddressChange4()">返回</mt-button>
        </mt-header>
        <mt-cell v-for="item in address" :key="item" :title="item.name" @click.native="onAddressChange4(item)"></mt-cell>
      </div>
      <div v-if="areaVisible4">
        <mt-header title="选择城市">
          <mt-button icon="back" slot="left" @click="cancelAddressChange5()">返回</mt-button>
        </mt-header>
        <mt-cell v-for="item in city.child" :key="item" :title="item.name" @click.native="onAddressChange5(item)"></mt-cell>
      </div>
      <div v-if="areaVisible5">
        <mt-header title="选择上牌时间">
          <mt-button icon="back" slot="left" @click="cancelAddressChange5()">返回</mt-button>
        </mt-header>
        <mt-cell v-for="item in time" :key="item" :title="item+'年'" @click.native="onAddressChange6(item)"></mt-cell>
      </div>
      <div v-if="areaVisible6">
        <mt-header title="选择上牌时间">
          <mt-button icon="back" slot="left" @click="cancelAddressChange6()">返回</mt-button>
        </mt-header>
        <mt-cell v-for="item in mouth" :key="item" :title="item+'月'" @click.native="onAddressChange7(item)"></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
  import expresss from "../../assets/address.js";
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
        endDate: new Date(),
        address: [],
        list: {
          modelid: "",
          zone: '',
          regDate: '',
          mile: '',
        },
        imgurl: '',
        vin: '',
        city: '',
        choose: false,
        areaVisible: false,
        brand: [],
        areaVisible1: false,
        brandid: '', //品牌ID
        series: '', //车型ID
        chooseseries: '', //当前选择的车系
        modleid: '', //车系ID
        time: [], //上牌时间年份
        choosemouth: '', //当前选择的月份
        mouth: [], //上牌时间月份
        areaVisible2: false,
        areaVisible3: false,
        areaVisible4: false,
        areaVisible5: false,
        mintime: '', //最小时间
        maxtime: '', //最大时间
        city: [],
        addressSlots1: [],
        addressSlots2: [],
        addressSlots3: [],
        value2: null,
        disable: false //车系是否获得
      };
    },
    mounted() {
      this.address = expresss
      console.log(expresss)
      // this.getInfo()
    },
    watch: {
      vin: function (n, o) {
        this.getInfo()
      },
    },
    methods: {
      //上传价目表 
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
                console.log('图片太大')
                _this.imgScale0(base64, 0.8)
              } else {
                //ajax请求，通过formdata进行上传图片 
                var formdata = new FormData();
                // var blob = _this.dataURItoBlob(base64);
                // formdata.append('file', blob, 'image.png');
                _this.imgurl = base64
                console.log(base64)
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
          // alert(_this.imgurl)
          _this.driveData = canvas.toDataURL('image/jpeg').split("base64,")[1]
          // var str = canvas.toDataURL('image/jpeg').replace('data:image/png;base64,', '');
          // var equalIndex = str.indexOf('=');
          // if (str.indexOf('=') > 0) {
          //   str = str.substring(0, equalIndex);
          // }
          // var strLength = str.length;
          // var fileLength = parseInt(strLength - (strLength / 8) * 2);
          // console.log(fileLength + '字节');
          // alert('base64：'+_this.imgurl);
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
            //   }else{
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
      getInfo() {
        console.log(mainurl)
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
                this.list.modelid = response.data.Result.model_id
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
              Toast('服务器开小差啦，请稍后再试')
            }.bind(this)
          );
      },
      open() {
        if (this.disable) {
          Toast('抱歉，没能获取到该车型，请上传行驶证进行车辆估值')
        } else {
          if (this.list.modelid !== '') {
            this.areaVisible5 = true
            this.choose = true
            this.time.push(this.mintime)
            for (let i = 0; i < this.maxtime - this.mintime; i++) {
              this.time.push(this.mintime + (i + 1))
            }
            console.log(this.maxtime)
            console.log(this.mintime)
            console.log(this.time)
          } else {
            Toast('请先选择车型')
          }
        }
      },
      handlerArea() {
        this.areaVisible = true
        this.choose = true
      },
      handlerArea1() {
        Indicator.open();
        this.$http
          .get("api/Back/ChoseCarBeand", {})
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                for (var i = 0; i < response.data.Result.length; i++) {
                  if (this.addressSlots1.indexOf(response.data.Result[i].Brand_initial) == -1) {
                    this.addressSlots1.push(response.data.Result[i].Brand_initial);
                  }
                }
                this.brand = response.data.Result
                this.choose = true
                this.areaVisible1 = true
              } else {
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
      onAddressChange(picker, values) {
        picker.setSlotValues(1, address[values[0]]);
        this.list.zone = values[0] + values[1];
        this.city = values[1];
        console.log(this.city)
      },
      onAddressChange1(values) {
        console.log(values)
        this.brandid = values.Brand_id
        this.confirm1()
      },
      onAddressChange2(values) {
        this.chooseseries = values.Series_Name
        this.series = values.Series_id
        this.confirm2()
      },
      onAddressChange3(values) {
        this.modleid = values
        this.confirm3()
      },
      onAddressChange4(values) {
        this.areaVisible = false
        this.areaVisible4 = true
        this.city = values
      },
      onAddressChange5(values) {
        this.list.zone = this.city.name + ' ' + values.name
        this.areaVisible4 = false
        this.choose = false
      },
      onAddressChange6(values) {
        this.areaVisible5 = false
        this.areaVisible6 = true
        this.choosemouth = values
        var myDate = new Date(); //获取系统当前时间
        if (values == myDate.getFullYear()) {
          for (let i = 0; i < myDate.getMonth() + 1; i++) {
            this.mouth.push(i + 1)
          }
          myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        } else {
          this.mouth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
      },
      onAddressChange7(values) {
        this.list.regDate = this.choosemouth + '年' + values + '月'
        this.areaVisible4 = false
        this.choose = false
      },
      confirm1() {
        Indicator.open();
        this.$http
          .get("api/Back/ChoseCarSeries", {
            params: {
              brandid: this.brandid
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                this.addressSlots2 = response.data.Result
                this.areaVisible1 = false
                this.areaVisible2 = true
              } else {
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
      confirm2() {
        Indicator.open();
        this.$http
          .get("api/Back/ChoseCarModel", {
            params: {
              seriesid: this.series
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                if (response.data.Result.length == 0) {
                  this.areaVisible2 = false
                  this.choose = false
                  this.list.modelid = this.chooseseries
                  this.disable = true
                  Toast('抱歉，没能获取到该车型，请上传行驶证进行车辆估值')
                } else {
                  this.addressSlots3 = response.data.Result
                  this.areaVisible2 = false
                  this.areaVisible3 = true
                }
              } else {
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
      confirm3() {
        this.areaVisible3 = false
        this.choose = false
        this.list.modelid = this.modleid.Model_Name
        this.mintime = this.modleid.Minyear
        this.maxtime = this.modleid.Maxyear
      },
      cancelAddressChange1() {
        this.choose = false
      },
      cancelAddressChange2() {
        this.areaVisible1 = true
        this.areaVisible2 = false
      },
      cancelAddressChange3() {
        this.areaVisible2 = true
        this.areaVisible3 = false
      },
      cancelAddressChange4() {
        this.areaVisible = false
        this.choose = false
      },
      cancelAddressChange5() {
        this.areaVisible = false
        this.areaVisible4 = true
      },
      cancelAddressChange6() {
        this.areaVisible6 = false
        this.areaVisible5 = true
      },
      handleChange(value) {
        console.log(value)
        this.list.Date = value
      },
      formatDate(date) {
        const y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        return y + '-' + m + '-' + d
      },
      handleChange(value) {
        this.list.regDate = this.formatDate(value)
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
          .get("api/Back/GetCarPrice", {
            params: {
              modelid: this.modleid.Model_ID,
              regDate: this.list.regDate,
              zone: this.city,
              mile: this.list.mile
              // Token: getCookie("token"),
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

  /* li {
    display: inline-block;
    margin: 0 10px;
  } */

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
    margin-left: 2%;
    color: #808080
  }

</style>
