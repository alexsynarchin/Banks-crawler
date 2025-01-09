import {createRouter, createWebHistory} from 'vue-router'

/* Layout */
import Layout from '@/layout/Layout.vue'

/* Router for modules */

import errorRoutes from './modules/error'
import bankRoutes from  './modules/banks.js'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },

  {
    path: '/auth-redirect',
    component: () => import('@/views/login/AuthRedirect.vue'),
    hidden: true,
  },
  {
    path: '/404',
    redirect: { name: 'Page404' },
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          name: 'Dashboard',
          meta: { title: 'Панель управления', bootstrapIcon: 'house-fill', noCache: false },
      },
      {
            path: 'credits',
            component: () => import('@/views/credits/index.vue'),
            name: 'Credits',
            meta: { title: 'Кредиты', bootstrapIcon: 'house-fill', noCache: false },
      },
      {
        path: 'profile',
        component: () => import('@/views/user-profile/index.vue'),
        name: 'UserProfile',
        meta: { title: 'Профиль', bootstrapIcon: 'house-fill', noCache: false },
      },
    ],
  }

]

export const asyncRoutes = [
    bankRoutes,
  errorRoutes,

  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404', hidden: true }
]

const router = createRouter({
  routes: constantRoutes,
  scrollBehavior: () => ({ top: 0 }),
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
})

export function resetRouter() {
  const asyncRouterNameArr = asyncRoutes.map((mItem) => mItem.name)
  asyncRouterNameArr.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}

export default router
