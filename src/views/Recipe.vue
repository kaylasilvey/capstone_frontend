<template>
  <div id="recipes">
    <div class="container">
      <h2 class="font-alt text-center">Recipes</h2>
      <div class="font-serif text-center" style="padding-bottom: 25px">Because there's food at home.</div>
      <hr class="divider" />
    </div>

    <!-- INGREDIENT SEARCH BAR --------------------------------------------------------->

    <div class="container form-group" style="padding-bottom: 30px">
      <input
        v-model="ingredient"
        type="text"
        list="items"
        class="form-control"
        placeholder="SEARCH ALL PANTRY ITEMS*"
        aria-label="items"
        aria-describedby="button-addingredient"
      />
      <div class="text-center">
        <button
          class="btn btn-block btn-round btn-d"
          type="button"
          id="button-addingredient"
          v-on:click="addIngredient"
        >
          Add Ingredient to Recipe Search
        </button>
      </div>

      <datalist id="items">
        <option v-for="item in orderBy(filterBy(items, searchFilter, 'name'), sortAttribute)" v-bind:key="item.id">
          {{ item.name }}
        </option>
      </datalist>
    </div>

      <!-- END INGREDIENT SEARCH BAR --------------------------------------------------->

      <!-- RECIPE RESULTS -------------------------------------------------------------->

      <div class="container">
        <div class="row multi-columns-row">
          <!-- INDIVIDUAL RECIPE POST ---------------------------------------------------->

          <div class="col-sm-6 col-md-4 col-lg-4 m-b-60" v-for="recipe in recipes">
            <div class="post">
              <div class="post-media">
                <a href="blog-single.html">
                  <img class="crop" :src="`${recipe.image_url}`" alt="" />
                </a>
              </div>
              <div class="post-meta font-alt">
                By
                <a :href="`${recipe.source_url}`">{{ recipe.publisher }}</a>
              </div>
              <div class="post-header">
                <h4 class="post-title font-alt">
                  <a :href="`${recipe.source_url}`">{{ recipe.title }}</a>
                </h4>
              </div>

              <!-- MODAL TRIGGER ------------------------------------------------------->

              <a type="a" class="post-more font-alt" data-toggle="modal" data-target="#exampleModalLong">
                Ingredients
              </a>

              <!--INGREDIENTS MODAL ---------------------------------------------------->

              <div
                class="modal fade"
                id="exampleModalLong"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">{{ recipe.title }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {{ recipe.ingredients }}
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- END INGREDIENTS MODAL ----------------------------------------------->
            </div>
          </div>
        </div>

        <!-- INGREDIENT SEARCH LIST ------------------------------------------------------>

        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
              <form>
                <div class="form-group font-alt">
                  <h6 class="font-alt" style="font-size: 12px;">Search for Recipes Containing:</h6>
                  <hr class="divider" />
                </div>

                <blockquote style="min-height: 300px">
                  <div class="form-check" v-for="ingredient in ingredients">
                    <input class="form-check-input" type="checkbox" value="" :id="`ingredient${ingredient}`" />
                    <label
                      class="form-check-label panel-body"
                      style="font-size: 14px;"
                      :for="`ingredient${ingredient}`"
                    >
                      {{ ingredient }}
                    </label>
                  </div>
                </blockquote>
              </form>
    
                <button type="submit" class="btn btn-primary btn-border-d btn-round button">
                  Remove From List
                </button>
                <button class="btn btn-border-d btn-round button" v-on:click="getRecipes()">
                  Search for Recipes
                </button>
              
            </div>
          </div>
        </div>
        <!-- END INGREDIENT SEARCH LIST ------------------------------------------------>
      </div>

      <!-- PAGINATION ------------------------------------------------------------------>

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

      <!-- END PAGINATION -------------------------------------------------------------->
    </div>
  </div>
</template>

<style>
.button {
  width: 50%;
  float: auto;
}
.crop {
  width: 250px;
  height: 200px;
  object-fit: cover;
}
</style>

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
      var ingredient = this.ingredient
      this.ingredients.push(ingredient);
      this.ingredient = "";
      console.log(this.ingredients);
    }
  }
};
</script>
