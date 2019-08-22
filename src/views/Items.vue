<template>
  <div id="items">
    <section class="module">
      <div class="container">
        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <h1>{{ message }}</h1>
            <div v-for="item in items">
              <h1>{{ item.name }}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "HELLO. IS ANYTHING THERE.",
      items: [
        {
          name: "",
          UOM: "",
          locations: []
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
  methods: {}
};
</script>
