<template>
  <div class="page-cell">
    <mt-cell title="排放标准" :value="list.model_emission_standard"></mt-cell>
    <mt-cell title="车型ID" :value="list.model_id"></mt-cell>
    <mt-cell title="车辆品牌名" :value="list.brand_name"></mt-cell>
    <mt-cell title="车系名称" :value="list.series_name"></mt-cell>
    <mt-cell title="车型年款" :value="list.model_year"></mt-cell>
    <mt-cell title="品牌ID" :value="list.brand_id"></mt-cell>
    <mt-cell title="变速箱类型" :value="list.model_gear"></mt-cell>
    <mt-cell title="排量"  :value="list.model_liter"></mt-cell>
    <!-- <mt-cell title="车型名称" :value="list.brand_name"></mt-cell> -->
    <mt-cell title="车系ID" :value="list.series_id"></mt-cell>
    <mt-cell title="车型指导价" :value="list.model_price"></mt-cell>
    <mt-cell title="最小上牌年份" :value="list.min_reg_year"></mt-cell>
    <mt-cell title="最大上牌年份" :value="list.max_reg_year"></mt-cell>
    <!-- <mt-cell title="映射车型ID" :value="list.brand_name"></mt-cell> -->
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
  export default {
    data: function () {
      return {
        list: {}
      };
    },
    mounted() {
      if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
      this.getInfo()
    },
    methods: {
      getInfo() {
        Indicator.open();
        this.$http
          .get("api/Back/Carvin", {
            params: {
              vin: '1G6A95RX3E0128766',
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
    position: fixed;
    bottom: 1rem;
    width: 100%
  }

  .foot-btn button {
    width: 46%;
    margin-left: 2%;
  }

</style>
