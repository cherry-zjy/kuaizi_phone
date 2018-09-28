import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/components/home/index.vue'
import QueryRecord from '@/components/home/QueryRecord.vue'
import CarImage from '@/components/home/CarImage.vue'
import CarQuery from '@/components/home/CarQuery.vue'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: index,
  }, {
    path: '/QueryRecord',
    name: '查询记录',
    component: QueryRecord
  },{
    path: '/CarImage',
    name: '上传图片-估值',
    component: CarImage
  },{
    path: '/CarQuery',
    name: '车辆估值查询',
    component: CarQuery
  }]
})
