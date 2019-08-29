<template>
  <div id="locations">
    <div class="container location">
      <section class="module">
        <div class="container">
          <h2 class="font-alt text-center">My Kitchen:</h2>
          <div class="row multi-columns-row">
            <div class="col-sm-6 col-sm-offset-3">
              <!-- ACCORDIONS -->
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
                      <p>{{ item.name }} | {{ item.QTY }} | {{ item.UOM }}
                        <p>
                        <button class="btn btn-border-d btn-round btn-xs">Edit</button>
                      </p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /ACCORDIONS -->
            </div>
            
          </div>
        
        </div>

        <!-- ADD LOCATION ---------------------->
        <div style="text-align: center;">
<p>
          <button 
          class="btn btn-border-d btn-round btn-lg" 
          type="submit"
          data-toggle="modal"
          data-target="#newLocationModal">Add New Location</button>
          
</p>

      <!-- Add LOCATION Modal -->
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
              <h5 class="modal-title panel-title font-alt" id="newLocationModalTitle">Create New Location</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <!-- END EDIT MODAL -->




<p>
        <!-- EDIT LOCATION -------------------------->
 
 <!-- Edit LOCATION Button -->

 <button
        type="submit"
        class="btn btn-border-d btn-round btn-lg"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Edit Locations
      </button>
    </p>
      <!-- Edit LOCATION Modal -->
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
              <h5 class="modal-title panel-title font-alt" id="exampleModalCenterTitle">Edit Locations</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-check font-alt" v-for="location in locations">
                
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <!-- END EDIT MODAL -->
</div>
      </section>
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
    //AXIOS --------------------------------------------->
    axios.get("/api/locations").then(response => {
      this.locations = response.data;
      console.log(this.locations);
    });
  },
  methods: {
     // DESTROY ------------------------------------------------------>
    destroyLocation: function(inputLocation) {
      axios.delete("/api/locations/" + inputLocation.id).then(response => {
        console.log("Location Deleted", response.data);
        var index = this.locations.indexOf(inputLocation);
        this.locations.splice(index, 1);
      });
    },
  }
};
</script>
