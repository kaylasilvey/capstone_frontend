<template>
  <div id="ItemNew" class="container">
    <section class="module">
      <form v-on:submit.prevent="createItem()">
        <h1>New Item</h1>
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
    </section>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      name: "",
      UOM: "",
      QTY: "",
      location: ""
    };
  },
  methods: {
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
