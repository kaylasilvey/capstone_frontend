<template>
  <div id="app">
    <div class="wrapper">
   <!-- NAVIGATION -->
    <nav class="navbar navbar-custom navbar-transparent navbar-light navbar-fixed-top">

      <div class="container">

        <div class="navbar-header">
          <!-- YOU LOGO HERE -->
          <a class="navbar-brand" href="index.html"><img src="assets/images/magnifying-glass-icon.png" width="60" alt="">
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
    <section class="module module-parallax bg-light-30" data-background="assets/images/produce-cropped.jpg">
    </section>
</div>

<hr class="divider"><!-- DIVIDER -->

    <!-- RELATED PROJECT -->
    <section class="module">

      <div class="container">

        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <h2 class="module-title font-alt">Everything in its place.</h2>
          </div>
        </div>
        <!-- /MODULE TITLE -->

        <!-- WORKS GRID -->
        <div class="row">

          <div id="works-grid" class="works-grid works-hover-w">

            <!-- DO NOT DELETE THIS DIV -->
            <div class="grid-sizer"></div>

            <!-- PORTFOLIO ITEM -->
            <div class="work-item design">
              <a href="index.html">
                <img src="assets/images/pasta.jpg" alt="">
                <div class="work-caption font-alt">
                  <h3 class="work-title">Pantry Items</h3>
                  <div class="work-descr">
                    Catalogue
                  </div>
                </div>
              </a>
            </div>
            <!-- /PORTFOLIO ITEM -->

            <!-- PORTFOLIO ITEM -->
            <div class="work-item design">
              <a href="index.html">
                <img src="assets/images/kitchen-1.jpg" alt="">
                <div class="work-caption font-alt">
                  <h3 class="work-title">Pantry Locations</h3>
                  <div class="work-descr">
                    Organize
                  </div>
                </div>
              </a>
            </div>
            <!-- /PORTFOLIO ITEM -->

            <!-- PORTFOLIO ITEM -->
            <div class="work-item design">
              <a href="index.html">
                <img src="assets/images/blank-page.jpg" alt="">
                <div class="work-caption font-alt">
                  <h3 class="work-title">Grocery Lists</h3>
                  <div class="work-descr">
                    Plan
                  </div>
                </div>
              </a>
            </div>
            <!-- /PORTFOLIO ITEM -->

            <!-- PORTFOLIO ITEM -->
            <div class="work-item design">
              <a href="index.html">
                <img src="assets/images/baking-2.jpg" alt="">
                <div class="work-caption font-alt">
                  <h3 class="work-title">Recipes</h3>
                  <div class="work-descr">
                    Create
                  </div>
                </div>
              </a>
            </div>
            <!-- /PORTFOLIO ITEM -->

          </div>

        </div>
        <!-- /WORKS GRID -->

      </div>

    </section>
    <!-- /RELATED PROJECT -->
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
