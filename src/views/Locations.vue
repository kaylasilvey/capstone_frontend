<template>
  <div id="locations">
    <div class="container location">
      <section class="module">
        <div class="container">
          <h2 class="font-alt text-center">My Locations:</h2>
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
        <div style="text-align: center;"">
          <button class="btn btn-border-d btn-round btn-lg">Add New Location</button>
        </div>
      </section>
      </div>
    </div>
  </div>
</template>

      <section class="module">
        <div class="container">
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
                    <div class="panel-body" v-for="item in location.items">
                      <p>{{ item.name }} | {{ item.QTY }} | {{ item.UOM }}</p>
                      <p>
                        <button class="btn btn-border-d btn-round btn-xs">Edit</button>
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
