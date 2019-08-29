<template>
  <div id="userhome">
    <!-- RELATED PROJECT -->
    <section class="module">
      <div class="container">
        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <h2 class="module-title font-alt">A place for everything...</h2>
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
              <a href="/items">
                <img src="assets/images/pasta.jpg" alt="" />
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
              <a href="/locations">
                <img src="assets/images/kitchen-1.jpg" alt="" />
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
              <a href="#">
                <img src="assets/images/blank-page.jpg" alt="" />
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
              <a href="#">
                <img src="assets/images/baking-2.jpg" alt="" />
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

        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <h2 class="module-title font-alt">& everything in its place.</h2>
          </div>
        </div>
        <!-- /MODULE TITLE -->
      </div>
    </section>
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      message: "home"
    };
  },
  created: function() {},
  methods: {}
};
</script>
