<template>
  <div class="page-cell">
    <p class="title">上传需要查询资料的行驶证</p>
    <div class="imgbox">
      <img src="../../assets/upload.png" class="upload">
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
