import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/count-up",
    name: "CountUp",
    component: () =>
      import(/* webpackChunkName: "count-up" */ "@/views/CountUp.vue"),
  },
  {
    path: "/count-down",
    name: "CountDown",
    component: () =>
      import(/* webpackChunkName: "count-down" */ "@/views/CountDown.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
