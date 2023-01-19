import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      name: "Craft",
      component: () => import("../views/CraftView.vue"),
    },
    {
      path: "/cocktails",
      name: "Cocktails",
      component: () => import("../views/InProgress.vue"), 
    },
    {
      path:"/mypantry",
      name: "MyPantry",
      component: () => import("../views/InProgress.vue"),
    },
  ],
});

export default router;
