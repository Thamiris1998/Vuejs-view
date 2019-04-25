import Vue from "vue";
import Router from "vue-router";
import Funcionario from "./views/Funcionario.vue";

Vue.use(Router);
const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/funcionario" },
    {
      path: "/funcionario",
      name: "funcionario",
      component: Funcionario,
      linkActiveClass: "active",
    },
  ],
  linkActiveClass: "active"
});

export default router;
