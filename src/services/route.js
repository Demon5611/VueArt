import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import GalaryDetails from "../components/pages/GalaryDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/gallery/details",
    name: "GalaryDetails",
    component: GalaryDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

export default router;
