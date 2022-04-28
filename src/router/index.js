import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    children: [
      {
        path: "report",
        name: "report",
        component: () => import("../views/Report.vue"),
      },
      {
        path: "article",
        name: "article",
        component: () => import("../views/article/Article.vue"),
      },
      {
        path: "editor",
        name: "editor",
        component: () => import("../views/article/Editor.vue"),
      },
      {
        path: "preview/:id",
        name: "preview",
        component: () => import("../views/article/Preview.vue"),
      },
      {
        path: "visualization",
        name: "visualization",
        component: () => import("../views/Visualization.vue"),
      },
      {
        path: "test",
        component: () => import("../views/Test.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/:pathMath(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
