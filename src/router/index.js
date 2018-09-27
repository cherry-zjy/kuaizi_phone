import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/components/home/index.vue'
import QueryRecord from '@/components/home/QueryRecord.vue'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: index,
    children: [
      { path: '/QueryRecord', component: QueryRecord, name: '查询记录' },
    ]
  }]
})
