import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../Home.vue";

Vue.use(VueRouter);

// import("home/Article").then((m) => {
//   console.log("m: ", m);
// });

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../About.vue"),
  },
  {
    path: "/article",
    name: "Article",
    component: () => import("home/Article").then((m) => m.default),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
