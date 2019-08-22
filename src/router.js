import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Items from "./views/Items.vue";
import Locations from "./views/Locations.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Signup from "./views/Signup.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/items",
      name: "items",
      component: Items
    },
    {
      path: "/locations",
      name: "locations",
      component: Locations
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    }
  ]
});
