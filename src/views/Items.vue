<template>
  <div id="items">
    <div class="container">
      <!-- MODULE TITLE ---------------------------------------------------->

      <h1 class="font-alt text-center">My Pantry</h1>

      <!-- /MODULE TITLE ---------------------------------------------------->

      <!-- SEARCH BAR ------------------------------------------------------>

      <div class="container form-group">
        <div style="padding-bottom: 25px">
          <input
            v-model="searchFilter"
            type="text"
            list="names"
            class="form-control font-alt col-8"
            placeholder="SEARCH ALL ITEMS*"
          />
        </div>

        <!-- ITEMS LIST --------------------------------------------------------->

        <div class="row">
          <!-- ITEM ACCORDIONS ------------------------------------------------------>

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
                  {{ location.QTY }} | {{ item.UOM }} | {{ location.name }}

                  <!-- ITEM EDIT MODAL BUTTON --------------------------------------------------------->

                  <button
                    type="submit"
                    class="btn btn-g btn-round btn-border-d btn-xs"
                    data-toggle="modal"
                    :data-target="`#editModal${item.id}Center`"
                    style="float: right;"
                  >
                    Edit
                  </button>

                  <!-- ITEM EDIT MODAL --------------------------------------------------------->

                  <div
                    class="modal fade"
                    :id="`editModal${item.id}Center`"
                    tabindex="-1"
                    role="dialog"
                    :aria-labelledby="`editModal${item.id}CenterTitle`"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered text-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title font-alt text-center" :id="`editModal${item.id}CenterTitle`">
                            Update Item
                          </h5>

                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <!-- ITEM EDIT MODAL BODY --------------------------------------------------------->

                        <div class="modal-body">
                          <form v-on:submit.prevent="updateItem(item)" style="padding-bottom: 25px">
                            <div class="form-group">
                              Name:
                              <input
                                v-model="edit_name"
                                type="text"
                                class="form-control"
                                value="item.name"
                                :placeholder="`${item.name}`"
                              />
                            </div>

                            <div class="form-group">
                              UOM:
                              <input v-model="edit_UOM" type="text" class="form-control" :placeholder="`${item.UOM}`" />
                            </div>

                            <div class="form-group">
                              Quantity:
                              <input v-model="edit_QTY" type="integer" class="form-control" />
                            </div>

                            <div class="form-group">
                              Location:
                              <select v-model="edit_location_id" class="form-control">
                                <option v-for="location in locations" :value="location.id">
                                  {{ location.name }}
                                </option>
                              </select>
                            </div>

                            <input
                              type="submit"
                              value="Update"
                              class="btn btn-b btn-sm btn-primary"
                              data-dismiss="modal"
                            />
                          </form>
                        </div>

                        <!-- / ITEM EDIT MODAL --------------------------------------------------------->
                      </div>
                    </div>
                  </div>

                  <!-- END ITEM EDIT MODAL --------------------------------------------------------->

                  <!-- ITEM DELETE--------------------------------------------------------->
                  <button
                    class="btn btn-g btn-border-d btn-round btn-xs"
                    style="float: right;"
                    v-on:click="destroyItem(item)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <!-- /ACCORDIONS ----------------------------------------------->
          </div>
        </div>
      </div>
      <!-- END SEARCH BAR ------------------------------------------------------------->

      <!-- CREATE ITEM MODAL ---------------------------------------------------->
      <section>
        <div class="text-center" style="padding-bottom: 30px;">
          <button
            type="submit"
            class="btn btn-border-d btn-round btn-lg"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Add New Item
          </button>
        </div>
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
                <h5 class="modal-title text-center font-alt" id="exampleModalCenterTitle">Create New Item</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form v-on:submit.prevent="createItem()" style="padding-bottom: 25px">
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
                  <input type="submit" value="Create" class="btn btn-b btn-sm btn-primary" data-dismiss="modal" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- END CREATE MODAL --------------------------------------------------->
      </section>
    </div>
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
      header: "Pantry Items",
      items: [],
      name: "",
      UOM: "",
      location: [],
      QTY: "",
      location_item_id: "",
      locations: [],
      item: [],
      location_items: [],

      searchFilter: "",
      sortAttribute: "name",
      location_id: "",
      item_id: "",

      edit_name: "",
      edit_UOM: "",
      edit_QTY: "",
      edit_location_id: ""
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
    },

    // UPDATE ITEM ----------------------------------->
    updateItem: function(inputItem) {
      var params = {
        name: this.edit_name,
        UOM: this.edit_UOM,
        QTY: this.edit_QTY,
        location_id: this.edit_location_id
      };
      axios.patch("/api/items/" + inputItem.id, params).then(response => {
        console.log("Item Updated", response.data);
        inputItem.name = this.edit_name;
        inputItem.UOM = this.edit_UOM;
        axios
          .patch("/api/location_items/" + inputItem.id, params)
          .then(response => {
            console.log("Location Updated", response.data);
            inputItem.QTY = this.edit_QTY;
            inputItem.location_id = this.edit_location_id;
          })
          .catch(error => console.warn(error.response));
      });
    }
  }
};
</script>
