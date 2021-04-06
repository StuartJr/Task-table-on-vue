import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: () => import("../views/List.vue"),
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/Create.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
