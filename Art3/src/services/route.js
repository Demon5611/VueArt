import { createRouter, createWebHistory } from 'vue-router';
import Blog from '../components/pages/Blog.vue';
import Mainpage from '../components/pages/Mainpage.vue';

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
    // Если есть сохраненная позиция, возвращаем её (например, при навигации "назад" или "вперед")
    if (savedPosition) {
      return savedPosition;
    }
    // Если есть хэш (например, #gallery), скроллим к этому элементу с плавной прокруткой
    else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth', // плавная прокрутка
      };
    }
    // В других случаях прокручиваем страницу к началу
    else {
      return { top: 0 };
    }
  },
});


export default router;
