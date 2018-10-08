<template>
  <div class="hello">
    <mt-cell title="车辆估值">
      <span>
        <mt-button type="primary" plain size="small" @click="Car()">查询</mt-button>
      </span>
    </mt-cell>
    <mt-cell title="保险查询">
      <span>
        <mt-button type="primary" plain size="small" @click="Insurance()">查询</mt-button>
      </span></mt-cell>
    <mt-cell title="维保查询">
      <span>
        <mt-button type="primary" plain size="small" @click="Maintenance()">查询</mt-button>
      </span></mt-cell>
    <div class="foot-btn">
      <mt-button type="primary" @click="goto('/Result')">VIN查询</mt-button>
      <mt-button type="primary" @click="goto('/mine')">我的订单</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {};
    },
    methods: {
      // Record(){
      //   this.$router.push("/QueryRecord");
      // },
      Car() {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
        this.$router.push("/CarImage");
      },
      Insurance() {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
        this.$router.push("/InsuranceImage");
      },
      Maintenance() {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
        this.$router.push("/MaintenanceImage");
      },
      goto(url) {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$router.push("/Login");
          return;
        }
        this.$router.push(url);
      }

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

  .foot-btn {
    position: fixed;
    bottom: 1rem;
    width: 96%;
    margin-left: 2%
  }

  .foot-btn button {
    width: 49%
  }

</style>
