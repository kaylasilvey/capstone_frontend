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
          <div v-for="item in items">
            <div class="col-sm-3">
              <!--  <h4>{{ item.location }}</h4> -->
              <p>{{ item.name }}</p>
            </div>
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

Vue.use(VueInstant);

export default {
  data: function() {
    return {
      value: "",
      suggestionAttribute: "item.name",
      suggestions: [],
      selectedEvent: "",
      items: [
        {
          name: "",
          UOM: ""
        }
      ]
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
      axios.get("/api/items/name?q=" + this.value).then(function(response) {
        response.data.results.forEach(function(a) {
          that.suggestions.push(a);
        });
      });
    }
  }
};
</script>
