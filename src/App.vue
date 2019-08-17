<template>
  <div id="app">
   <!-- NAVIGATION -->
    <nav class="navbar navbar-custom navbar-transparent navbar-light navbar-fixed-top">

      <div class="container">

        <div class="navbar-header">
          <!-- YOU LOGO HERE -->
          <a class="navbar-brand" href="index.html">
            <!-- IMAGE OR SIMPLE TEXT -->
            <h1><img src="https://www.extension.iastate.edu/eatfreshsei/files/resize/page/images/static1.squarespace-300x225.jpg" width="40" alt="">  Mise En.</h1>
          </a>
        </div>

        <!-- ICONS NAVBAR -->
        <ul id="icons-navbar" class="nav navbar-nav navbar-right">
          <li>
            <a href="#" id="toggle-menu" class="show-overlay" title="Menu">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
          </li>
        </ul>
        <!-- /ICONS NAVBAR -->

        <ul class="extra-navbar nav navbar-nav navbar-right">
          <li><a href="index.html" title="Home">Home</a></li>
          <li><a href="items.html" title="Items">Items</a></li>
          <li><a href="locations.html" title="Locations">Locations</a></li>
          <li><a href="lists.html" title="Lists">Lists</a></li>
        </ul>

      </div>

    </nav>
    <!-- /NAVIGATION -->
<!-- HERO -->
    <section class="module module-parallax bg-light-30" data-background="assets/images/choppingblock.jpg">
    </section>

    <body>
<router-view />
</body>
    <!-- FOOTER -->
    <footer class="module bg-light">

      <div class="container">

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

            <p class="copyright text-center m-b-0">© 2019 <a href="#">Mise En.</a>, All Rights Reserved.</p>

          </div>

        </div>

      </div>

    </footer>
    <!-- /FOOTER -->
  <!-- SCROLLTOP -->
  <div class="scroll-up">
    <a href="#totop"><i class="fa fa-angle-double-up"></i></a>
  </div>
  </div>
  </div>

</template>

<style></style>
