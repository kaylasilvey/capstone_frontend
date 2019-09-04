import Vue from "vue";
import "vue-instant/dist/vue-instant.css";
import VueInstant from "vue-instant";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  watch: {
    $route: function() {
      window.location.reload();
    }
  }
}).$mount("#app");
