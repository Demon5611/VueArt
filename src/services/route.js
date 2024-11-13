import { createRouter, createWebHistory } from 'vue-router'

import Mainpage from '../components/pages/Mainpage.vue'

const routes = [
  {
    path: '/',
    name: 'Mainpage',
    component: Mainpage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохраненная позиция, возвращаем её (например, при навигации "назад" или "вперед")
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router
