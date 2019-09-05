<template>
  <!-- TABS ---------------------------------------------------------------------------->
  <section class="module">
    <div class="container">
      <!-- MODULE TITLE -------------------------------------------------->
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <h2 class="module-title font-alt">Groceries</h2>
        </div>
      </div>
      <!-- /MODULE TITLE -------------------------------------------------->

      <div class="row multi-columns-row">
        <div class="col-10" <div role="tabpanel">
          <ul class="nav nav-tabs font-alt" role="tablist">
            <li class="" v-for="list in lists"><a v-bind:href="`#category${list.id}`" data-toggle="tab" aria-expanded="true" v-on:click="setID=list.id, setList=list.item" >{{list.name}}</a></li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane" v-bind:id="`category${setID}`">
              <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">QTY | UOM | Item </span>
                    </div>
                    <input type="text" v-model="QTY" aria-label="QTY" class="form-control col-sm-2" aria-describedby="button-addon2">
                    <input type="text" v-model="UOM" aria-label="UOM" class="form-control col-sm-2" aria-describedby="button-addon2">
                    <input type="text" v-model="item" aria-label="name" class="form-control col-sm-6" aria-describedby="button-addon2">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="Add Item" id="button-addon2" v-on:click="addItem()">Add Item</button>
                    </div>
              </div>
                <ul>
                  <li v-for="item in setList">
                    {{item.QTY}} | {{item.UOM}} | {{item.name}}
                  </li>
                </ul>
              
            </div>
          </div>
        </div>
        <!-- /TABS --------------------------------------------------------------------->
      </div>
    </div>

    <!-- Add New Button----------------------------------------------------------------->

    <div style="text-align: center;">
      <p>
        <button
          class="btn btn-border-d btn-round btn-lg"
          type="submit"
          data-toggle="modal"
          data-target="#newLocationModal"
        >
          Add New Category
        </button>
        <!-- Add New Modal ------------------------------------------------------------->
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

              <button type="button" class="btn btn-border-d btn-round btn-sm btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <!-- end add new modal ----------------------------------------------------------->
      </p>
    </div>
  </section>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      lists: [],
      setID: "",
      setList: [],
      list: "",
      name: "",
      item: [],
      item:"",
      QTY: "",
      UOM: "",
      category_id: "",
      edit_name: "",
      
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
      var params ={
          item: this.item,
          UOM: this.UOM,
        };
      axios
        .post("/api/items", params)
        .then(response => {
          console.log("Success", response.data);
          console.log("adding item to list");
          this.$router.push("/items");
          var params ={
            QTY: this.QTY,
            UOM: this.UOM,
            item: response.data.id,
            list_id: this.setID
          };
          axios
            .post("api/list_items", params)
            .then(response => {
            console.log("Success", response.data);
            this.$router.push("/lists")
            .catch(error => console.log(error.response));
        })
        .catch(error => console.log(error.response));
    });
    },
     // DESTROY ------------------------------------------------------>
    
    destroyListCategory: function(inputList) {
      var params = {
        category_id: this.category_id
      }
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
      var params ={
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

