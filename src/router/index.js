import Vue from 'vue'
import VueRouter from 'vue-router'
import Leagues from '../dashboards/leagues.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'leagues',
    component: Leagues
  },
    {
        path: '/players',
        name: 'players',
        component: ()=> import('../dashboards/players.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes
})

Vue.config.devtools = true;
export default router
