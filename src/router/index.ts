import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/craft",
      name: "Craft",
      component: () => import("../views/CraftView.vue"),
    },
    {
      path: "/cocktails",
      name: "Cocktails",
      component: () => import("../views/CocktailView.vue"),
    },
    {
      path:"/mypantry",
      name: "MyPantry",
      component: () => import("../views/MyPantryView.vue"),
    },
  ],
});

export default router;
