<template>
  <div id="recipes">
    <!-- BLOG 3 COLUMN -->
    <section class="module text-center">
      <h1>Recipes</h1>
      <p>Because there's food at home.</p>
      <br />
      <div class="input-group mb-6">
        <input
          v-model="ingredient"
          type="text"
          list="ingredients"
          class="form-control text-center"
          placeholder="Search All Pantry Items"
          aria-label="ingredients"
          aria-describedby="button-addingredient"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="button-addingredient" v-on:click="addIngredient">
            Add Ingredient to Recipe Search
          </button>
        </div>
        <h4>Search for Recipes containing:</h4>
        <p v-for="ingredient in ingredients">{{ ingredient }}</p>
      </div>
      <datalist id="ingredients" class="text-right">
        <option v-for="item in items">{{ item.name }}</option>
      </datalist>

      <button v-on:click="getRecipes()">Search for Recipes</button>

      <p>{{ recipes }}</p>

      <div class="container">
        <div class="row multi-columns-row">
          <!-- POST -->
          <div class="col-sm-6 col-md-4 col-lg-4 m-b-60">
            <div class="post">
              <div class="post-media">
                <a href="blog-single.html">
                  <!-- recipe in recipes -->
                  <img src="assets/images/blog/blog-1.jpg" alt="" />
                  <!-- recipe image_url -->
                </a>
              </div>
              <div class="post-meta font-alt">
                By
                <a href="#">Publisher</a>
                <!-- recipe publisher -->
              </div>
              <div class="post-header">
                <h4 class="post-title font-alt">
                  <a href="blog-single.html">TITLE</a>
                  <!-- recipe title  -->
                </h4>
              </div>
              <div class="post-entry">
                <p>
                  <!-- {{ recipe source_url  }} -->
                </p>
              </div>
              <div class="post-more-link font-alt">
                <a href="#">Ingredients</a>
              </div>
            </div>
          </div>
          <!-- /POST -->

          <!-- POST -->
          <div class="col-sm-6 col-md-4 col-lg-4 m-b-60">
            <div class="post">
              <div class="post-media">
                <a href="blog-single.html">
                  <img src="assets/images/blog/blog-2.jpg" alt="" />
                </a>
              </div>
              <div class="post-meta font-alt">
                By
                <a href="#">Mark Stone</a>
                / 6 November / 2 comm.
              </div>
              <div class="post-header">
                <h4 class="post-title font-alt">
                  <a href="blog-single.html">The new common language will be</a>
                </h4>
              </div>
              <div class="post-entry">
                <p>
                  The European languages are members of the same family. Their separate existence is a myth. For
                  science, music, sport, etc, Europe uses the same vocabulary.
                </p>
              </div>
              <div class="post-more-link font-alt">
                <a href="blog-single.html">Read more</a>
              </div>
            </div>
          </div>
          <!-- /POST -->
        </div>

        <!-- PAGINATION -->
        <div class="row">
          <div class="col-sm-12 text-center m-t-60">
            <ul class="pagination font-alt">
              <li>
                <a href="#"><i class="fa fa-angle-left"></i></a>
              </li>
              <li><a href="#">1</a></li>
              <li class="active"><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li>
                <a href="#"><i class="fa fa-angle-right"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- /PAGINATION -->
      </div>
    </section>
    <!-- /BLOG 3 COLUMN -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      recipes: [],
      items: [],
      item: "",
      image_url: "",
      source_url: "",
      f2f_url: "",
      title: "",
      publisher: "",
      publisher_url: "",
      page: "",
      ingredients: [],
      ingredient: "",
      searchFilter: "",
      sortAttribute: "name"
    };
  },
  created: function() {
    axios.get("/api/items").then(response => {
      this.items = response.data;
      console.log(this.items);
    });
  },

  methods: {
    getRecipes: function() {
      var ingredients = "miso,corn";
      axios.get("/api/items/recipes?ingredients=" + ingredients).then(response => {
        this.recipes = response.data;
        console.log(this.recipes);
      });
    },
    addIngredient: function() {
      this.ingredients.push(this.ingredient);
      console.log(ingredients);
    }
  }
};
</script>
