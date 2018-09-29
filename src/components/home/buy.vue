<template>
  <div class="root">
    <p class="title">月卡查询套餐</p>
    <div class="list">
      <div v-for="(l,i) in 6" :key="i" :class="choiceNum == i?'active':''" @click="choiceClick(i)">
        <p class="list-price">￥11231</p>
        <p class="list-mouth">{{i}}个月</p>
      </div>
    </div>
    <!-- <div class="footer"> -->
      <!-- <div class="tip">小计：￥11231</div> -->
      <mt-button type="primary" class="foot-btn" @click="Record()">购买</mt-button>
    <!-- </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        choiceNum: 0
      }
    },
    components: {},
    methods: {
      choiceClick(i) {
        this.choiceNum = i
      }
    },
    mounted() {}
  }

</script>
<style scoped lang=''>
  .title {
    color: #808080;
    margin: 0;
    padding: 1rem 0 0rem 0.5rem;
  }

  .list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .list p{
    margin: 0.8rem 0;
  }

  .list div {
    margin-top: 1rem;
    width: 30%;
    border-radius: 0.5rem;
    text-align: center;
    background-color: #fff;
    border: 1px solid #D7D7D7;
  }

  .list .active {
    border: 1px solid #0b2c8c;
    background-color: #e6ebfb;
  }
  .list-price{
    font-size: 1.5rem;
    font-weight: 600;
  }
  .list-mouth{
    color: #999999
  }
  .foot-btn{
    position: fixed;
    bottom: 0rem;
    width: 100%;
  }

</style>
