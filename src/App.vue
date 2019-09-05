<template>
  <div id="app">
    <!-- PAGE LOADER ------------------------------------------------------------------->
    <div class="page-loader" style="display: none;">
      <div class="loader" style="display: none;">Loading...</div>
    </div>
    <!-- END PAGE LOADER ---------------------------------------------------------------->

    <!-- OVERLAY MENU ------------------------------------------------------------------->
    <div id="overlay-menu" class="overlay-menu">
      <a href="#" id="overlay-menu-hide" class="navigation-hide"><i class="ion-close-round"></i></a>

      <div class="overlay-menu-inner">
        <nav class="overlay-menu-nav">
          <ul id="nav">
            <li><a title="Home" href="/" v-if="!jwt">Home</a></li>
            <li><a title="Home" href="/home" v-if="jwt">Home</a></li>

            <li class="slidedown">
              <a href="#">Pantry Items</a>
              <ul>
                <li><a href="/items/new">Add New Item</a></li>
                <li><a href="/items">Show All Items</a></li>
              </ul>
            </li>

            <li class="slidedown">
              <a href="#">Pantry Locations</a>
              <ul id="locations">
                <li v-for="location in orderBy(filterBy(locations, searchFilter, 'name'), sortAttribute)">
                  <a href="/locations">
                    {{ location.name }}
                  </a>
                </li>
                <li><a href="/locations">View All Locations</a></li>
              </ul>
            </li>

            <li class="slidedown">
              <a href="#">Grocery Lists</a>
              <ul>
                <li><a href="#">Create New List</a></li>
                <li><a href="/lists">View All Lists</a></li>
              </ul>
            </li>
            <li><a href="/recipes">Recipes</a></li>
            <li><a href="#">My Account</a></li>
          </ul>
        </nav>
      </div>

      <div class="overlay-navigation-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 text-center">
              <p class="copyright font-alt m-b-0">© 2019 Mise En., All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /OVERLAY MENU ----------------------------------------------------------------->

    <div class="wrapper">
      <!-- NAVIGATION ------------------------------------------------------------------>

      <nav class="navbar navbar-custom navbar-transparent navbar-light navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <!-- LOGO HERE ------------------------------------------------------------->
            <a class="navbar-brand" href="/" v-if="!jwt">
              <img src="assets/images/faviconblack.png" width="45" alt="" />
            </a>
            <a class="navbar-brand" href="/home" v-if="jwt">
              <img src="assets/images/faviconblack.png" width="45" alt="" />
            </a>
          </div>

          <!-- ICONS NAVBAR ------------------------------------------------------------>
          <ul id="icons-navbar" class="nav navbar-nav navbar-right">
            <li>
              <a href="#" id="toggle-menu" class="show-overlay" title="Menu">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </a>
            </li>
          </ul>
          <!-- END ICONS NAVBAR -------------------------------------------------------->

          <ul class="extra-navbar nav navbar-nav navbar-right">
            <li><a href="/" title="Home" v-if="!jwt">Home</a></li>
            <li><a title="Home" href="/home" v-if="jwt">Home</a></li>
            <li><a href="/login" title="Login" v-if="!jwt">Login</a></li>
            <li><a href="/signup" title="SignUp" v-if="!jwt">Sign Up</a></li>
            <li><a href="/logout" title="Logout" v-if="jwt">Logout</a></li>
          </ul>
        </div>
      </nav>
      <!-- END NAVIGATION -------------------------------------------------------------->

      <!-- HERO ------------------------------------------------------------------------>

      <section class="module module-parallax bg-light-30" data-background="assets/images/preptable.jpg">
        <!-- HERO TEXT ----------------------------------------------------------------->

        <div class="container">
          <div class="row">
            <div class="col-sm-12 text-center">
              <h1 class="mh-line-size-1 font-alt m-b-20">{{ header }}</h1>
              <h5 class="mh-line-size-4 font-alt">{{ subheader }}</h5>
            </div>
          </div>
        </div>
        <!-- END HERO TEXT ------------------------------------------------------------->
      </section>

      <router-view v-on:changeJwt="setJwt()" />

      <!-- FOOTER ---------------------------------------------------------------------->

      <footer class="module-sm bg-light">
        <div class="container" style="padding-top: 30px">
          <div class="row">
            <div class="col-sm-12">
              <ul class="social-text-links font-alt text-center m-b-20">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Linkedin</a></li>
                <li><a href="#">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <p class="copyright text-center m-b-0">
                © 2019
                <a href="#">Mise En.</a>
                , All Rights Reserved.
              </p>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-sm-12 text-center">
              <img src="assets/images/faviconblack.png" width="70" alt="" />
            </div>
          </div>
        </div>
      </footer>
      <!-- END FOOTER ------------------------------------------------------------------>

      <!-- SCROLLTOP ------------------------------------------------------------------->
      <div class="scroll-up">
        <a href="#totop"><i class="fa fa-angle-double-up"></i></a>
      </div>
      <!-- END SCROLLTOP --------------------------------------------------------------->
    </div>
  </div>
</template>

<style></style>

<script>
import Vue from "vue";
import axios from "axios";
import "vue-instant/dist/vue-instant.css";
import VueInstant from "vue-instant";
import Vue2Filters from "vue2-filters";

Vue.use(VueInstant);

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      jwt: null,
      locations: [],
      header: "Mise En.",
      subheader: "",
      searchFilter: "",
      sortAttribute: "name"
    };
  },
  created: function() {
    axios.get("/api/locations").then(response => {
      this.locations = response.data;
      console.log(this.locations);
    });
    this.setJwt();
  },
  methods: {
    setJwt: function() {
      this.jwt = localStorage.getItem("jwt");
    }
  }
};
</script>
