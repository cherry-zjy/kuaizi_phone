import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/components/home/index.vue'
// import QueryRecord from '@/components/home/QueryRecord.vue'
import CarImage from '@/components/home/CarImage.vue'
import InsuranceImage from '@/components/home/InsuranceImage.vue'
import MaintenanceImage from '@/components/home/MaintenanceImage.vue'
import Result from '@/components/home/Result.vue'
// import CarQuery from '@/components/home/CarQuery.vue'

Vue.use(Router)
export default new Router({
  routes: [{
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
