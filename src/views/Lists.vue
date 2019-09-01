<template>
    <div id="lists">
    <div class="container list">
      <section class="module">
        <div class="container">
          <h2 class="font-alt text-center">Groceries:</h2>
          <div class="row multi-columns-row">
            <div class="col-sm-6 col-sm-offset-3">
              <!-- ACCORDIONS -->
              <div class="panel-group" id="accordion">
                <div class="panel panel-default" v-for="list in lists">
                  <div class="panel-heading">
                    <h4 class="panel-title font-alt">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordion"
                        v-bind:href="`#support${list.id}`"
                        aria-expanded="false"
                        class="collapsed"
                      >
                        {{ list.name }}
                      </a>
                    </h4>
                  </div>
                  <div
                    v-bind:id="`support${list.id}`"
                    class="panel-collapse collapse"
                    aria-expanded="false"
                    style="height: 0px;"
                  >
                    <div class="panel-body" v-for="item in list.item">
                      <p>{{ item.name }} | {{ item.QTY }}
                        <p>
                        <button class="btn btn-border-d btn-round btn-xs">Edit</button>
                        <button class="btn btn-border-d btn-round btn-xs">Delete</button>
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
      </section>
  </div>
</div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      lists: [],
      name: "",
      item: [],
      item: "",
      QTY: ""
    };
  },
  created: function() {
    axios.get("/api/lists").then(response => {
      this.lists = response.data;
      console.log(this.lists);
    });
  },

  methods: {}
};
</script>
