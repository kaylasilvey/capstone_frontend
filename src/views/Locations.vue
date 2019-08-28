<template>
  <div id="locations">
    <div class="container location">
      <div
        id="location-toggle"
        class="col-sm-12 text-center"
        v-for="location in locations"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <h1>
          {{ location.name }}
        </h1>
        <div class="collapse" id="collapseExample">
          <p v-for="item in location.item">{{ item.name }} | {{ item.QTY }} | {{ item.UOM }}</p>
        </div>
      </div>
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
