<template>
  <section class="module">
    <div class="container">
      <!-- PAGE TITLE ------------------------------------------------------------------>
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <h2 class="module-title font-alt">Groceries</h2>
        </div>
      </div>
      <!-- END PAGE TITLE -------------------------------------------------------------->

      <!-- TABS ------------------------------------------------------------------------>

      <!-- TAB TITLES ------------------------------------------------------------------>

      <div class="row multi-columns-row">
        <div class="col-10" <div role="tabpanel">
          <ul class="nav nav-tabs font-alt" role="tablist">
            <li class="" v-for="list in orderBy(filterBy(lists, searchFilter, 'name'), sortAttribute)">
              <a
                v-bind:href="`#category${list.id}`"
                data-toggle="tab"
                aria-expanded="true"
                v-on:click="(setID = list.id), (setList = list.item)"
              >
                {{ list.name }}
              </a>
            </li>
            <li>
                <a
                  class="nav nav-tabs font-alt"
                  type="submit"
                  data-toggle="modal"
                  data-target="#newLocationModal"
                >
                  Add New Category
                </a>
            </li>
          </ul>
</div>
          <!-- TAB ADD ITEM ------------------------------------------------------------>

          <div class="tab-content" style="min-height: 300px;">
            <div class="tab-pane" v-bind:id="`category${setID}`">
              <input
                type="text"
                v-model="QTY"
                aria-label="QTY"
                placeholder="QUANTITY*"
                class="form-control"
                aria-describedby="button-addon2"
              />
              <input
                type="text"
                v-model="UOM"
                aria-label="UOM"
                placeholder="UNIT OF MEASURE*"
                class="form-control"
                aria-describedby="button-addon2"
              />
              <input
                type="text"
                v-model="item"
                placeholder="ITEM NAME*"
                aria-label="name"
                class="form-control"
                aria-describedby="button-addon2"
              />
              <div class="input-group-append" style="padding-bottom: 20px;">
                <button class="btn btn-block btn-round btn-d" type="Add Item" id="button-addon2" v-on:click="addItem()">
                  Add Item To List
                </button>
              </div>

              <!-- TAB CONTENT --------------------------------------------------------->

              <blockquote style="min-height: 200px">
                <div class="form-check" v-for="item in setList">
                  <input class="form-check-input" type="checkbox" value="" :id="`item${item}`" />
                  <label class="form-check-label panel-body" style="font-size: 14px;" :for="`item${item}`">
                    {{ item.QTY }} | {{ item.UOM }} | {{ item.name }}
                  </label>
                </div>
              </blockquote>
                <div style="text-align: center;">
                  <button
                    class="btn btn-border-d btn-round btn-sm"
                    type="submit"
                    data-toggle="modal"
                    data-target="#newLocationModal"
                  >
                    Remove Item From List
                  </button>
                </div>
            </div>
        </div>

        <!-- END TABS ------------------------------------------------------------------>
      </div>
    </div>

    <!-- ADD NEW LIST ------------------------------------------------------------------>

      <!-- ADD NEW LIST MODAL -------------------------------------------------------->
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
              <h5 class="modal-title panel-title font-alt" id="newLocationModalTitle">Create New List Category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form v-on:submit.prevent="createListCategory()">
                <div class="form-group">
                  Name:
                  <input v-model="name" type="text" class="form-control" />
                </div>
                <input type="submit" value="Create" class="btn btn-border-d btn-round btn-sm btn-primary" />
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-border-d btn-round btn-xs btn-secondary" data-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- ADD NEW LIST MODAL ---------------------------------------------------------->
    </div>
  </section>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      lists: [],
      setID: "",
      setList: [],
      list: "",
      name: "",
      item: [],
      item: "",
      QTY: "",
      UOM: "",
      category_id: "",
      edit_name: "",
      searchFilter: "",
      sortAttribute: "name"
    };
  },
  created: function() {
    axios.get("/api/lists").then(response => {
      this.lists = response.data;
      console.log(this.lists);
      console.log(this.setList);
    });
  },

  methods: {
    // ADD ITEM ---------------------------------------------------->

    addItem: function() {
      console.log("Creating Item ...");
      var params = {
        item: this.item,
        UOM: this.UOM
      };
      axios.post("/api/items", params).then(response => {
        console.log("Success", response.data);
        console.log("adding item to list");
        this.$router.push("/items");
        var params = {
          QTY: this.QTY,
          UOM: this.UOM,
          item: response.data.id,
          list_id: this.setID
        };
        axios
          .post("api/list_items", params)
          .then(response => {
            console.log("Success", response.data);
            this.$router.push("/lists").catch(error => console.log(error.response));
          })
          .catch(error => console.log(error.response));
      });
    },
    // DESTROY ------------------------------------------------------>

    destroyListCategory: function(inputList) {
      var params = {
        category_id: this.category_id
      };
      axios.delete("/api/lists/" + this.category_id).then(response => {
        console.log("Location Deleted", response.data);
        var index = this.locations.indexOf(inputList);
        this.locations.splice(index, 1);
      });
    },
    // CREATE -------------------------------------------------------->
    createListCategory: function() {
      console.log("Creating List category ...");
      var formData = new FormData();
      formData.append("name", this.name);
      axios
        .post("/api/lists", formData)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/lists");
        })
        .catch(error => console.log(error.response));
    },
    // UPDATE -------------------------------------------------------->
    updateListCategory: function(inputList) {
      var params = {
        name: this.edit_name,
        category_id: this.category_id
      };
      console.log("Updating List Category ...");
      axios
        .patch("/api/lists/" + this.category_id, params)
        .then(response => {
          console.log("Success", response.data);
          inputList.name = this.edit_name;
          this.$router.push("/lists");
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>
