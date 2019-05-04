import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/examples/Test.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
    },
    {
      path: '/manage/staffs',
      name: 'manage-staffs',
      component: () => import('@/views/manage/Staffs.vue')
    },

    {
      path: '/manage/tables',
      name: 'manage-tables',
      component: () => import('@/views/manage/Tables.vue')
    },

    {
      path: '/customers/reservation',
      name: 'customers-reservation',
      component: () => import('@/views/customers/Reservation.vue')
    },

    // Not found
    {
      path: '*',
      name: '404',
      component: () => import('@/views/NotFound.vue')
    }

  ]
})
