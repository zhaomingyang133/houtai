import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/index',
          component: () => import('@/components/index.vue')
        },
        {
          path: '/users',
          component: () => import('@/components/users.vue')
        },
        {
          path: '/permission',
          component: () => import('@/components/permission.vue')
        },
        {
          path: '/role',
          component: () => import('@/components/role.vue')
        },
        {
          path: '/tinymce',
          component: () => import('@/components/tinymce.vue')
        }
      ]
    }
  ]
})
