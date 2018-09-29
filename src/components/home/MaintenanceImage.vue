<template>
  <div class="page-cell">
    <mt-cell title="上传需要查询车辆的行驶证">
    </mt-cell>
    <div class="imgbox">
      <img src="../../assets/add.png">
      <input type="file" name="file" v-on:change="addimg($event)" class="fileimg">
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        list: {
          
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
      // query(){
      //   this.$router.push("/CarQuery");
      // },
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
