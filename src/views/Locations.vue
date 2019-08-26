<template>
  <div id="locations">
    <div class="container location">
      <div class="col-sm-12 text-center" v-for="location in locations">
        <h1>{{ location.name }}</h1>
        <p v-for="item in location.item">{{ item.name }} | {{ item.QTY }} | {{ item.UOM }}</p>
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
      locations: [
        {
          name: "",
          item: [
            {
              name: "",
              UOM: "",
              QTY: ""
            }
          ]
        }
      ]
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
