// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/layouts/default/Default.vue'
import Login from '@/components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'layout',
    component: Home,
    children: [
      {
        path: '',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/landing',
        name: 'landing',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Landing.vue'),
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Page2.vue'),
      },
      {
        path: '/recent',
        name: 'recent',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Recent.vue'),
      },
      {
        path: '/echart',
        name: 'echart',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Echart.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
