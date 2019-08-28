<template>
  <div id="items" class="module text-center">
    <!-- MODULE TITLE -->
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3">
        <h2 class="module-title font-alt">Pantry Items</h2>
      </div>
    </div>
    <!-- /MODULE TITLE -->

    <!-- SEARCH BAR -->

    <section class="module">
      <div class="col-sm-12 text-center">
        <div id="vue-instant">
          <label>{{ selectedEvent }}</label>
          <vue-instant
            :suggestOnAllWords="true"
            :suggestion-attribute="suggestionAttribute"
            v-model="value"
            :disabled="false"
            @input="changed"
            @click-input="clickInput"
            @click-button="clickButton"
            @selected="selected"
            @enter="enter"
            @key-up="keyUp"
            @key-down="keyDown"
            @key-right="keyRight"
            @clear="clear"
            @escape="escape"
            :show-autocomplete="true"
            :autofocus="false"
            :suggestions="suggestions"
            name="customName"
            placeholder="Search all Pantry Items"
            type="google"
          ></vue-instant>
        </div>
      </div>

      <!-- END SEARCH BAR -->

      <!-- New Item Modal -->
      <button
        type="submit"
        class="btn btn-border-d btn-round btn-lg"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Add New Item
      </button>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Create New Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="createItem()">
                <div class="form-group">
                  Name:
                  <input v-model="name" type="text" class="form-control" />
                </div>
                <div class="form-group">
                  UOM:
                  <input v-model="UOM" type="text" class="form-control" />
                </div>
                <div class="form-group">
                  Quantity:
                  <input v-model="QTY" type="integer" class="form-control" />
                </div>
                <div class="form-group">
                  Location:
                  <select v-model="location" class="form-control">
                    <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
                  </select>
                </div>
                <input type="submit" value="Create" class="btn btn-primary" />
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- END MODAL -->

      <section class="module">
        <div class="container">
          <div class="row multi-columns-row">
            <div class="col-sm-6 col-sm-offset-3">
              <!-- ACCORDIONS -->
              <div class="panel-group" id="accordion">
                <div class="panel panel-default" v-for="item in items">
                  <div class="panel-heading">
                    <h4 class="panel-title font-alt">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordion"
                        v-bind:href="`#support${item.id}`"
                        aria-expanded="false"
                        class="collapsed"
                      >
                        {{ item.name }}
                      </a>
                    </h4>
                  </div>
                  <div
                    v-bind:id="`support${item.id}`"
                    class="panel-collapse collapse"
                    aria-expanded="false"
                    style="height: 0px;"
                  >
                    <div class="panel-body" v-for="location in item.location">
                      <p>{{ location.QTY }} | {{ item.UOM }} | {{ location.name }}</p>
                      <p><button type="submit" class="btn btn-border-d btn-round btn-xs">Edit</button></p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /ACCORDIONS -->
            </div>
          </div>
        </div>
      </section>
    </section>
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
      value: "",
      suggestionAttribute: "name",
      suggestions: [],
      selectedEvent: "",
      items: [],
      variable: false
    };
  },
  created: function() {
    axios.get("/api/items").then(response => {
      this.items = response.data;
      console.log(this.items);
    });
  },
  methods: {
    clickInput() {
      this.selectedEvent = "click input";
    },
    clickButton() {
      this.selectedEvent = "click button";
    },
    selected() {
      this.selectedEvent = "selection changed";
    },
    enter() {
      this.selectedEvent = "enter";
    },
    keyUp: function() {
      this.selectedEvent = "keyup pressed";
    },
    keyDown: function() {
      this.selectedEvent = "keyDown pressed";
    },
    keyRight: function() {
      this.selectedEvent = "keyRight pressed";
    },
    clear: function() {
      this.selectedEvent = "clear input";
    },
    escape: function() {
      this.selectedEvent = "escape";
    },
    changed: function() {
      var that = this;
      this.suggestions = [];
      axios.get("/api/items?q=" + this.value).then(function(response) {
        response.data.forEach(function(a) {
          that.suggestions.push(a);
        });
      });
    },
    createItem: function() {
      console.log("Creating Item ...");
      var formData = new FormData();
      formData.append("name", this.name);
      formData.append("UOM", this.UOM);
      axios
        .post("/api/items", formData)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/items");
        })
        .catch(error => console.log(error.response));
    },
    createItem: function() {
      console.log("Placing the item in its home ...");
      var formData = new FormData();
      formData.append("location", this.location.id);
      formData.append("QTY", this.QTY);
      axios
        .post("/api/location_items", formData)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/location_items");
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>
