import { createRouter, createWebHistory } from 'vue-router';
import Mainpage from '../components/pages/Mainpage.vue';
import Blog from '../components/pages/Blog.vue';

const routes = [
  {
    path: '/',
    name: 'Mainpage',
    component: Mainpage,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0 };
    }
  },
});

export default router;
