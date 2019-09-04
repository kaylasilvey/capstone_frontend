<template>
  <section class="module-sm">
    <div id="loggedOut" class="container">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3" style="margin-top: 35px">
          <h2 class="module-title font-alt">What We Do:</h2>
          <h4 class="module-subtitle divider font-serif">{{ message }}</h4>
          <hr class="divider" style="margin-top: 25px">
        </div>
      </div>
      <div class="row multi-columns-row">
        <!-- CONTENT BOX -->
        <div class="col-sm-6 col-md-4 col-lg-4">
          <div class="content-box">
            <div class="content-box-icon">
              <img src="assets/images/organize.png"></i>
            </div>
            <h5 class="content-box-title font-alt">Organize</h5>
            <div class="content-box-text">
              Add all grocery items in your kitchen to keep track of what you have, when you have it. These can be added
              to customizable locations withing your kitchen - as specific as you'd like!
            </div>
          </div>
        </div>
        <!-- /CONTENT BOX -->

        <!-- CONTENT BOX -->
        <div class="col-sm-6 col-md-4 col-lg-4">
          <div class="content-box">
            <div class="content-box-icon">
              <img src="assets/images/plan.png"></i>
            </div>
            <h5 class="content-box-title font-alt">Plan</h5>
            <div class="content-box-text">
              Add items to grocery lists as you use them, so you never run out of ingredients you need.
            </div>
          </div>
        </div>
        <!-- /CONTENT BOX -->

        <!-- CONTENT BOX -->
        <div class="col-sm-6 col-md-4 col-lg-4">
          <div class="content-box">
            <div class="content-box-icon">
              <img src="assets/images/create.png"></i>
            </div>
            <h5 class="content-box-title font-alt">Create</h5>
            <div class="content-box-text">
              Pantry items are linked to a recipe search database, so you always have culinary inspiration based on what
              you already have at the touch of a button!
            </div>
          </div>
        </div>
        <!-- /CONTENT BOX -->
      </div>
      <div class="row text-center" style="margin-bottom: 40px">
        <a class="btn btn-border-d btn-round btn-lg" href="/signup" role="button">Let's Get Started!</a>
      </div>
      </div>
    </div>
   
  </section>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      message: "A place for everything, and everything in its place..."
    };
  },
  created: function() {

  },
  methods: {
    toggleHome: function() {

    }
  }
};
</script>
