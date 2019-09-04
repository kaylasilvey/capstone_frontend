<template>
  <div class="newItem">
    <div class="container">
      <div class="form-group" style="padding-top: 30px">
        <form id="create-form" role="form" novalidate="" v-on:submit.prevent="createItem()">
          <h1 class="mh-line-size-3 font-alt m-b-20 text-center">NEW ITEM:</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>

          <div class="form-group">
            <label class="sr-only" for="name">Item Name</label>
            <input
              type="name"
              v-model="name"
              id="name"
              name="name"
              class="form-control"
              placeholder="ITEM NAME*"
              required=""
              data-validation-required-message="Please enter a name for this item."
            />
            <p class="help-block text-danger"></p>
          </div>

          <div class="form-group">
            <label class="sr-only" for="UOM">Item Unit of Measure</label>
            <input
              type="UOM"
              v-model="UOM"
              id="UOM"
              name="UOM"
              class="form-control"
              placeholder="UNIT OF MEASURE*"
              required=""
              data-validation-required-message="Please enter an unit of measure for this item."
            />
            <p class="help-block text-danger"></p>
          </div>

          <div class="form-group">
            <label class="sr-only" for="QTY">Quantity</label>
            <input
              type="QTY"
              v-model="QTY"
              id="QTY"
              name="QTY"
              class="form-control"
              placeholder="QUANTITY*"
              required=""
              data-validation-required-message="Please enter a quantity for this item."
            />
            <p class="help-block text-danger"></p>
          </div>

          <div class="form-group">
            <label class="sr-only" for="location">LOCATION</label>
            <h6 class="font-alt" style="color: #6D6C69;">Where would you like to place this item?</h6>
            <select v-model="location" class="form-control">
              <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
            </select>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-block btn-round btn-d">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div class="module-subtitle font-serif" style="padding-top: 10px">Let's go!</div>
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
      location: "",
      locations: [],
      location_id: "",
      item_id: "",
      errors: []
    };
  },

  created: function() {
    axios.get("/api/items").then(response => {
      this.items = response.data;
      console.log(this.items);
    });

    axios.get("/api/locations").then(response => {
      this.locations = response.data;
      console.log(this.locations);
    });

    axios.get("/api/location_items").then(response => {
      this.location_items = response.data;
      console.log(this.location_items);
    });
  },

  methods: {
    // CREATE ITEM ----------------------------------->
    createItem: function() {
      console.log("Creating Item ...");
      var formData = new FormData();
      formData.append("name", this.name);
      formData.append("UOM", this.UOM);
      axios
        .post("/api/items", formData)
        .then(response => {
          console.log("Success", response.data);
          console.log("Placing the item in its home ...");
          this.$router.push("/items");
          var formData = new FormData();
          formData.append("location_id", this.location_id);
          formData.append("QTY", this.QTY);
          formData.append("item_id", response.data.id);
          axios
            .post("/api/location_items", formData)
            .then(response => {
              console.log("Success", response.data);
              this.$router.push("/items");
            })
            .catch(error => console.log(error.response));
        })
        .catch(error => console.log(error.response));
      this.errors = ["Please fill in all information"];
    }
  }
};
</script>
