<template>
  <div class="hello">
    <mt-cell title="车辆估值">
      <span>
        <mt-button type="primary" size="small">查询</mt-button>
      </span>
    </mt-cell>
    <mt-cell title="保险查询">
      <span>
        <mt-button type="primary" size="small">查询</mt-button>
      </span></mt-cell>
    <mt-cell title="维保查询">
      <span>
        <mt-button type="primary" size="small">查询</mt-button>
      </span></mt-cell>
    <mt-cell title="VIN识别">
      <span>
        <mt-button type="primary" size="small">查询</mt-button>
      </span>
    </mt-cell>
    <mt-button type="primary" class="foot-btn">查询记录</mt-button>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        menuList: [],
        userName: "",
        collapsed: false,
        iscloseNav: false,
        welcome: true,
      };
    },
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

  .hello {
    margin-top: 10%
  }
  .foot-btn{
    position: fixed;
    bottom: 1rem;
    width: 96%;
  }

</style>
