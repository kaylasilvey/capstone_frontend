<template>
  <div id="items">
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
      <div class="container">
        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-3" v-for="item in items">
            <ul id="items">
              <li>{{ item.name }}</li>
              <ul v-for="location in item.location">
                <li>{{ location.QTY }} | {{ item.UOM }} | {{ location.name }}</li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
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
      items: []
    };
  },
  created: function() {
    axios.get("/api/items").then(response => {
      this.items = response.data;
      console.log(this.items);
    });
  },
  methods: {
    // clickInput() {
    //   this.selectedEvent = "click input";
    // },
    // clickButton() {
    //   this.selectedEvent = "click button";
    // },
    // selected() {
    //   this.selectedEvent = "selection changed";
    // },
    // enter() {
    //   this.selectedEvent = "enter";
    // },
    // keyUp: function() {
    //   this.selectedEvent = "keyup pressed";
    // },
    // keyDown: function() {
    //   this.selectedEvent = "keyDown pressed";
    // },
    // keyRight: function() {
    //   this.selectedEvent = "keyRight pressed";
    // },
    // clear: function() {
    //   this.selectedEvent = "clear input";
    // },
    // escape: function() {
    //   this.selectedEvent = "escape";
    // },
    changed: function() {
      var that = this;
      this.suggestions = [];
      axios.get("/api/items?q=" + this.value).then(function(response) {
        response.data.forEach(function(a) {
          that.suggestions.push(a);
        });
      });
    }
  }
};
</script>
