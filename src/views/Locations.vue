<template>
  <div id="locations" style="margin-bottom: 25px;">
    <div class="container">
      <div class="container">
        <h2 class="font-alt text-center">My Kitchen:</h2>
        <div style="margin-bottom: 15px;">
          <hr class="divider" />
        </div>

        <!-- LOCATIONS LIST ------------------------------------------------------------>

        <div class="row">
          <!-- ACCORDIONS -------------------------------------------------------------->

          <div class="panel-group" id="accordion">
            <div class="panel panel-default" v-for="location in locations">
              <div class="panel-heading">
                <h4 class="panel-title font-alt">
                  <a
                    data-toggle="collapse"
                    data-parent="#accordion"
                    v-bind:href="`#support${location.id}`"
                    aria-expanded="false"
                    class="collapsed"
                  >
                    {{ location.name }}
                  </a>
                </h4>
              </div>
              <div
                v-bind:id="`support${location.id}`"
                class="panel-collapse collapse"
                aria-expanded="false"
                style="height: 0px;"
              >
                <div class="panel-body" v-for="item in location.item">
                  {{ item.name }} | {{ item.QTY }} | {{ item.UOM }}
                  <button class="btn btn-border-d btn-round btn-xs" style="float: right;">Delete</button>
                  <button class="btn btn-border-d btn-round btn-xs" style="float: right;">Edit</button>
                </div>
              </div>
            </div>
          </div>

          <!-- END ACCORDIONS ---------------------------------------------------------->
        </div>
      </div>
    </div>

    <!-- LOCATION BUTTONS -------------------------------------------------------------->

    <div class="text-center">
      <!-- ADD LOCATION BUTTON --------------------------------------------------------->

      <button
        class="buttons btn btn-border-d btn-round btn-md"
        type="submit"
        data-toggle="modal"
        data-target="#newLocationModal"
        style="box-sizing: 100px"
      >
        Add New Location
      </button>

      <!-- EDIT LOCATION BUTTON -------------------------------------------------------->

      <button
        type="submit"
        class="buttons btn btn-border-d btn-round btn-md"
        data-toggle="modal"
        data-target="#editLocationModalCenter"
      >
        Edit Location
      </button>

      <!-- DELETE LOCATION BUTTON ------------------------------------------------------>

      <button
        type="submit"
        class="buttons btn btn-border-d btn-round btn-md"
        data-toggle="modal"
        data-target="#deleteLocationModalCenter"
      >
        Delete Location
      </button>
    </div>

    <!-- MODALS ------------------------------------------------------------------------>

    <!-- ADD LOCATION MODAL ------------------------------------------------------------>

    <div
      class="modal fade"
      id="newLocationModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newLocationModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title font-alt text-center" id="newLocationModalTitle">Create New Location</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="createLocation()">
              <div class="form-group">
                <input v-model="name" type="text" class="form-control" placeholder="LOCATION NAME*" />
              </div>
              <input type="submit" value="Create" class="btn btn-border-d btn-round btn-sm btn-primary" />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- END ADD LOCATION MODAL -------------------------------------------------------->

    <!-- EDIT LOCATION MODAL ----------------------------------------------------------->

    <div
      class="modal fade"
      id="editLocationModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLocationModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title font-alt text-center" id="editLocationModalCenterTitle">Update Location</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateLocation(location)">
              <div class="form-group">
                <h6 class="font-alt" style="color: #6D6C69">Select Location to Edit:</h6>
                <select v-model="location_id" class="form-control">
                  <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <input
                  v-model="edit_name"
                  type="text"
                  class="form-control"
                  value="location.name"
                  placeholder="NEW LOCATION NAME*"
                />
              </div>
              <input type="submit" value="Update" class="btn btn-border-d btn-round btn-sm btn-primary" />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- DELETE LOCATION MODAL ----------------------------------------------------------->

    <div
      class="modal fade"
      id="deleteLocationModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteLocationModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title font-alt text-center" id="deleteLocationModalCenterTitle">Delete</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="destroyLocation(location)">
              <div class="form-group">
                <h6 class="font-alt" style="color: #6D6C69">Select Location to Delete:</h6>
                <select v-model="location_id" class="form-control">
                  <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
                </select>
                <h6 class="font-serif text-center">Note: this will delete the location and all items in it.</h6>
              </div>
              <input type="submit" value="Delete" class="btn btn-border-d btn-round btn-sm btn-primary text-center" />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END DELETE MODAL ------------------------------------------------------------>
  </div>
</template>

<style>
.buttons button {
  width: 33%;
  float: center;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "MY LOCATIONS",
      locations: [],
      location: "",
      name: "",
      edit_name: "",
      location_id: ""
    };
  },
  created: function() {
    //AXIOS ------------------------------------------------------------->
    axios.get("/api/locations").then(response => {
      this.locations = response.data;
      console.log(this.locations);
    });
  },
  methods: {
    // DESTROY --------------------------------------------------------->
    destroyLocation: function(inputLocation) {
      var params = {
        location_id: this.location_id
      };
      axios.delete("/api/locations/" + this.location_id).then(response => {
        console.log("Location Deleted", response.data);
        var index = this.locations.indexOf(inputLocation);
        this.locations.splice(index, 1);
      });
    },
    // CREATE ----------------------------------------------------------->
    createLocation: function() {
      console.log("Creating Location ...");
      var formData = new FormData();
      formData.append("name", this.name);
      axios
        .post("/api/locations", formData)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/locations");
        })
        .catch(error => console.log(error.response));
    },
    // UPDATE ----------------------------------------------------------->
    updateLocation: function(inputLocation) {
      var params = {
        name: this.edit_name,
        location_id: this.location_id
      };
      console.log("Updating Location ...");
      axios
        .patch("/api/locations/" + this.location_id, params)
        .then(response => {
          console.log("Success", response.data);
          inputLocation.name = this.edit_name;
          this.$router.push("/locations");
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>
