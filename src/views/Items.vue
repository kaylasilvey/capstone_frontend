<template>
  <div id="items" class="module text-center">
    <!-- MODULE TITLE -->
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3">
        <h2 class="module-title font-alt">Pantry Items</h2>
      </div>
    </div>
    <!-- /MODULE TITLE -->

    <!-- SEARCH BAR -->

    <section class="module">
      <div class="container form-group">
        <h2>Search All Items:</h2>
        <br />
        <input v-model="searchFilter" type="text" list="names" class="form-control text-center" />
        <!--    <datalist id="names">
          <option v-for="item in items">{{ item.name }}</option>
        </datalist> -->
        <!-- ITEMS LIST ----->

        <div class="row multi-columns-row">
          <div class="col-sm-6 col-sm-offset-3">
            <!-- ACCORDIONS -->
            <div class="panel-group" id="accordion">
              <div
                class="panel panel-default"
                v-for="item in orderBy(filterBy(items, searchFilter, 'name'), sortAttribute)"
                v-bind:key="item.id"
              >
                <div class="panel-heading">
                  <h4 class="panel-title font-alt">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      v-bind:href="`#support${item.id}`"
                      aria-expanded="false"
                      class="collapsed"
                    >
                      {{ item.name }}
                    </a>
                  </h4>
                </div>
                <div
                  v-bind:id="`support${item.id}`"
                  class="panel-collapse collapse"
                  aria-expanded="false"
                  style="height: 0px;"
                >
                  <div class="panel-body" v-for="location in item.location">
                    <p>{{ location.QTY }} | {{ item.UOM }} | {{ location.name }}</p>
                    <p>
                      <button class="btn btn-border-d btn-round btn-xs">Edit</button>
                    </p>
                    <p>
                      <button class="btn btn-border-d btn-round btn-xs" v-on:click="destroyItem(item)">
                        Delete
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- /ACCORDIONS -->
          </div>
        </div>
      </div>
    </section>
    <!-- END SEARCH BAR -->
    <!-- CREATE ITEM MODAL ------->
    <section>
      <!-- New Item Modal -->
      <button
        type="submit"
        class="btn btn-border-d btn-round btn-lg"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Add New Item
      </button>
      <!-- CREATE Modal ---------------------------------------------->
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Create New Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="createItem()">
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
                  <select v-model="location_id" class="form-control">
                    <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
                  </select>
                </div>
                <input type="submit" value="Create" class="btn btn-primary" />
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- END CREATE MODAL --------------------------------------------------->
    </section>
    <!-- END CREATE ITEM MODAL --------------->
  </div>
</template>

<style></style>

<script>
import Vue from "vue";
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      items: [],
      searchFilter: "",
      sortAttribute: "name",
      locations: [],
      name: "",
      UOM: "",
      QTY: "",
      location_id: "",
      item_id: ""
    };
  },
  created: function() {
    axios.get("/api/items").then(response => {
      this.items = response.data;
      console.log(this.items);
    });
  },
  alsocreated: function() {
    axios.get("/api/locations").then(response => {
      this.locations = response.data;
      console.log(this.locations);
    });
  },

  methods: {
    // DESTROY ------------------------------------------------------>
    destroyItem: function(inputItem) {
      axios.delete("/api/items/" + inputItem.id).then(response => {
        console.log("Item Deleted", response.data);
        var index = this.items.indexOf(inputItem);
        this.items.splice(index, 1);
      });
    },

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
    }
  }
};
</script>
