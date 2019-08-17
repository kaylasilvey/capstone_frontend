<template>
  <div class="items">
    <h1>{{ message }}</h1>
    <div v-for="item in items">
      <div>
        <router-link v-bind:to="`/items/${item.id}`">More info</router-link>
      </div>
      <h2>{{ item.name }}</h2>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "MY ITEMS",
      items: [],
      name: "",
      UOM: "",
      location: ""
    };
  },
  created: function() {
    axios.get("/api/items").then(response => {
      this.items = response.data;
      console.log(this.items);
    });
  },
  methods: {}
};
</script>
