import Vue from 'vue'
import VueRouter from 'vue-router'
import EPL from '../dashboards/epl.vue'
import Eredivisie from '../dashboards/eredivisie.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'epl',
    component: EPL
  },
  {
    path: '/eredivisie',
    name: 'eredivisie',
    component: Eredivisie
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes
})

// Vue.config.devtools = true;
export default router
