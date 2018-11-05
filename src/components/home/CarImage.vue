<template>
  <div class="page-cell">
    <p class="title">上传需要查询资料的行驶证</p>
    <div class="imgbox">
      <img :src="imgurl" class="upload" id="car" v-if="imgurl">
      <img src="../../assets/upload.png" class="upload" v-if="!imgurl">
      <input id="image" type="file" name="file" accept="image/*" v-on:change="SetMayImg0($event)" class="fileimg">
    </div>
    <p class="title">输入查询车辆相关信息</p>
    <mt-field disableClear label="VIN码" placeholder="请输入VIN码" v-model="vin"></mt-field>
    <!-- <mt-field disableClear label="车型ID" placeholder="请输入车型ID" ></mt-field> -->
    <mt-cell title="车型ID" :value="list.modelid" is-link @click.native="handlerArea1"></mt-cell>
    <mt-popup v-model="areaVisible1" class="area-class" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancelAddressChange1()">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm1()">确定</span>
      </div>
      <mt-picker valueKey="Brand_Name" :slots="addressSlots1" @change="onAddressChange1" class="picker"
        :visible-item-count="5"></mt-picker>
    </mt-popup>
    <mt-popup v-model="areaVisible2" class="area-class" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancelAddressChange2()">上一步</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm2()">确定</span>
      </div>
      <mt-picker valueKey="Series_Name" :slots="addressSlots2" class="picker" @change="onAddressChange2"
        :visible-item-count="5"></mt-picker>
    </mt-popup>
    <mt-popup v-model="areaVisible3" class="area-class" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancelAddressChange3()">上一步</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm3()">确定</span>
      </div>
      <mt-picker valueKey="Model_Name" :slots="addressSlots3" class="picker" @change="onAddressChange3" :visible-item-count="5"></mt-picker>
    </mt-popup>
    <mt-cell title="省市" :value="list.zone" is-link @click.native="handlerArea"></mt-cell>
    <mt-cell title="上牌日期" :value="list.regDate" is-link @click.native="open('picker2')"></mt-cell>
    <mt-popup v-model="areaVisible" class="area-class" position="bottom">
      <mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5"></mt-picker>
    </mt-popup>
    <mt-field disableClear label="行驶里程（万公里）" type="number" placeholder="行驶里程" v-model="list.mile"></mt-field>
    <mt-datetime-picker ref="picker2" type="date" v-model="value2" @confirm="handleChange" :endDate="endDate">
    </mt-datetime-picker>
    <div class="foot-btn">
      <!-- <mt-button type="primary" size="small" @click="query()">单次查询</mt-button> -->
      <mt-button type="primary" @click="query()">确认</mt-button>
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
  const address = {
    '北京': ['北京'],
    '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山',
      '潮州', '揭阳', '云浮'
    ],
    '上海': ['上海'],
    '天津': ['天津'],
    '重庆': ['重庆'],
    '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
    '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
    '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江',
      '神农架林区'
    ],
    '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中',
      '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'
    ],
    '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
    '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
    '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
    '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
    '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
    '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
    '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
    '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
    '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
    '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
    '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
    '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
    '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
    '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州',
      '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'
    ],
    '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
    '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县',
      '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'
    ],
    '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
    '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
    '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
    '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州',
      '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'
    ],
    '香港': ['香港'],
    '澳门': ['澳门'],
    '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县',
      '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市'
    ]
  };
  export default {
    data: function () {
      return {
        endDate: new Date(),
        list: {
          modelid: "",
          zone: '',
          regDate: '',
          mile: '',
        },
        imgurl: '',
        vin: '',
        city: '',
        areaVisible: false,
        areaVisible1: false,
        brandid: '', //品牌ID
        series: '', //车型ID
        modleid: '', //车系ID
        areaVisible2: false,
        areaVisible3: false,
        addressSlots: [{
          flex: 1,
          values: Object.keys(address),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['北京'],
          className: 'slot3',
          textAlign: 'center'
        }],
        addressSlots1: [{
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'brandslot'
        }],
        addressSlots2: [{
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'seriesslot'
        }],
        addressSlots3: [{
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'modelslot'
        }],
        value2: null,
      };
    },
    mounted() {
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
      // 创建一个Blob对象 用于将base64转化为formdata
      // dataURItoBlob(base64Data) {
      //   var byteString;
      //   if (base64Data.split(',')[0].indexOf('base64') >= 0) {
      //     byteString = window.atob(base64Data.split(',')[1]);
      //   } else {
      //     byteString = unescape(base64Data.split(',')[1]);
      //   }
      //   var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]; //type
      //   //处理异常,将ascii码小于0的转换为大于0
      //   var ab = new ArrayBuffer(byteString.length); //size
      //   var ia = new Uint8Array(ab);
      //   for (var i = 0; i < byteString.length; i++) {
      //     ia[i] = byteString.charCodeAt(i);
      //   }
      //   return new Blob([ab], {
      //     type: mimeString
      //   });
      // },
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
      open(picker) {
        this.$refs[picker].open();
      },
      handlerArea() {
        this.areaVisible = true
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
                this.addressSlots1 = [{
                    flex: 1,
                    defaultIndex: 0,
                    values: response.data.Result,
                    className: 'brandslot'
                  }],
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
      onAddressChange1(picker, values) {
        console.log(values)
        this.brandid = values[0].Brand_id
      },
      onAddressChange2(picker, values){
        this.series = values[0].Series_id
      },
      onAddressChange3(picker, values){
        this.modleid = values[0]
      },
      confirm1() {
        Indicator.open();
        this.$http
          .get("api/Back/ChoseCarSeries", {
            params:{
              brandid:this.brandid
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                this.addressSlots2 = [{
                  flex: 1,
                  defaultIndex: 0,
                  values: response.data.Result,
                  className: 'seriesslot'
                }],
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
            params:{
              seriesid:this.series
            }
          })
          .then(
            function (response) {
              Indicator.close();
              var status = response.data.Status;
              if (status === 1) {
                this.addressSlots3 = [{
                  flex: 1,
                  defaultIndex: 0,
                  values: response.data.Result,
                  className: 'modelslot'
                }],
                this.areaVisible2 = false
                this.areaVisible3 = true
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
        this.list.modelid = this.modleid.Model_ID
      },
      cancelAddressChange1() {
        this.areaVisible1 = false
      },
      cancelAddressChange2() {
        this.areaVisible1 = true
        this.areaVisible2 = false
      },
      cancelAddressChange3() {
        this.areaVisible2 = true
        this.areaVisible3 = false
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
              modelid: this.list.modelid,
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
