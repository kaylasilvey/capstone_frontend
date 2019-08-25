<template>
  <div id="ItemNew" class="container new">
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
      Name: "",
      UOM: ""
    };
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
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
    }
  }
};
</script>
