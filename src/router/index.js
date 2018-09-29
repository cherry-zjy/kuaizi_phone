import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/home/Login.vue'
import index from '@/components/home/index.vue'
import Buy from '@/components/home/buy.vue'
import mine from '@/components/home/mine.vue'
// import QueryRecord from '@/components/home/QueryRecord.vue'
import CarImage from '@/components/home/CarImage.vue'
import InsuranceImage from '@/components/home/InsuranceImage.vue'
import MaintenanceImage from '@/components/home/MaintenanceImage.vue'
import Result from '@/components/home/Result.vue'
// import CarQuery from '@/components/home/CarQuery.vue'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/Login',
    name: '登录',
    component: Login,
  },{
    path: '/Buy',
    name: '购买月卡',
    component: Buy,
  },{
    path: '/Mine',
    name: '我的',
    component: mine,
  },{
    path: '/',
    name: '首页',
    component: index,
  }, {
    path: '/CarImage',
    name: '上传图片-估值',
    component: CarImage
  }, {
    path: '/InsuranceImage',
    name: '上传图片-保险',
    component: InsuranceImage
  },{
    path: '/MaintenanceImage',
    name: '上传图片-维保',
    component: MaintenanceImage
  },{
    path: '/Result',
    name: '车辆识别结果',
    component: Result
  }]
})
