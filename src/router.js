import Vue from 'vue'
import Router from 'vue-router'
import Instruments from './views/Instruments.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/instruments'
    },
    {
      path: '/instruments',
      name: 'instruments',
      component: Instruments
    }
  ]
})
export default router
