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
    <!-- <mt-button type="primary" class="foot-btn" @click="Record()">查询记录</mt-button> -->
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
      };
    },
    methods:{
      // Record(){
      //   this.$router.push("/QueryRecord");
      // },
      Car(){
        this.$router.push("/CarImage");
      },
      Insurance(){
        this.$router.push("/InsuranceImage");
      },
      Maintenance(){
        this.$router.push("/MaintenanceImage");
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
  .foot-btn{
    position: fixed;
    bottom: 1rem;
    width: 96%;
    margin-left: 2%
  }

</style>
