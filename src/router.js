import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Items from "./views/Items.vue";
import Locations from "./views/Locations.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Signup from "./views/Signup.vue";
import ItemNew from "./views/ItemNew.vue";
import Lists from "./views/Lists.vue";
import Recipes from "./views/Recipe.vue";
import UserHome from "./views/UserHome.vue";

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
      path: "/home",
      name: "userhome",
      component: UserHome
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
    },
    {
      path: "/items/new",
      name: "itemNew",
      component: ItemNew
    },
    {
      path: "/lists",
      name: "lists",
      component: Lists
    },
    {
      path: "/recipes",
      name: "recipes",
      component: Recipes
    }
  ]
});
