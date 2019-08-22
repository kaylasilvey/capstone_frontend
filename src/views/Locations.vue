<template>
  <div id="locations">
    <div class="container location">
      <h1>{{ message }}</h1>
      <h2 v-for="location in locations">{{ location.name }}</h2>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "MY LOCATIONS",
      locations: []
    };
  },
  created: function() {
    axios.get("/api/locations").then(response => {
      this.locations = response.data;
      console.log(this.locations);
    });
  },
  methods: {}
};
</script>
