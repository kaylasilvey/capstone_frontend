<template>
  <div id="recipes text-center">
    <!-- BLOG 3 COLUMN -->
    <section class="module text-center">
      <h2 class="module-title font-alt">Recipes</h2>
      <div class="module-subtitle font-serif">Because there's food at home.</div>
      <br />
      <div class="input-group mb-6 text-center">
        <input
          v-model="ingredient"
          type="text"
          list="items"
          class="form-control text-center"
          placeholder="Search All Pantry Items"
          aria-label="items"
          aria-describedby="button-addingredient"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="button-addingredient" v-on:click="addIngredient">
            Add Ingredient to Recipe Search
          </button>
        </div>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Search for Recipes containing:</label>
            <div class="form-check" v-for="ingredient in ingredients">
              <input class="form-check-input" type="checkbox" value="" :id="`ingredient${ingredient}`" />
              <label class="form-check-label" :for="`ingredient${ingredient}`">
                {{ ingredient }}
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-sm">
            Remove From Search List
          </button>
        </form>
      </div>
    </section>
      <datalist id="items" class="text-right">
        <option v-for="item in items">{{ item.name }}</option>
      </datalist>

      <button v-on:click="getRecipes()">Search for Recipes</button>

      <div class="container">
        <div class="row multi-columns-row">
          <!-- POST -->
          <div class="col-sm-6 col-md-4 col-lg-4 m-b-60">
            <div class="post" v-for="recipe in recipes">
              <div class="post-media">
                <a href="blog-single.html">
                  <!-- recipe in recipes -->
                  <img :src="`${recipe.image_url}`" alt="" />
                  <!-- recipe image_url -->
                </a>
              </div>
              <div class="post-meta font-alt">
                By
                <a :href="`${recipe.source_url}`">{{ recipe.publisher }}</a>
                <!-- recipe publisher -->
              </div>
              <div class="post-header">
                <h4 class="post-title font-alt">
                  <a :href="`${recipe.source_url}`">{{ recipe.title }}</a>
                  <!-- recipe title  -->
                </h4>
              </div>
<!--INGREDIENTS MODAL --------------------->
        <!-- Button trigger modal -->
<a type="a" class="post-more font-alt" data-toggle="modal" data-target="#exampleModalLong">
  Ingredients
</a>

<!-- Modal -->
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">{{recipe.title}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {{recipe.ingredients}}
      </div>
      <div class="modal-footer">
      
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- /INGREDIENTS MODAL --------------------->

            </div>
          </div>
          <!-- /POST -->
        </div>
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
      recipe: "",
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
      var ingredients = this.ingredients;
      var ingredients = ingredients.toString();
      console.log(ingredients);
      axios.get("/api/items/recipes?ingredients=" + ingredients).then(response => {
        this.recipes = response.data.recipes.recipes;
        console.log(this.recipes);
      });
    },
    addIngredient: function() {
      this.ingredients.push(this.ingredient);
      console.log(this.ingredients);
    }
  }
};
</script>
