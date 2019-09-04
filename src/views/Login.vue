<template>
  <div class="login">
    <div class="container">
      <div class="form-group" style="padding-top: 30px">
        <form id="contact-form" role="form" novalidate="" v-on:submit.prevent="submit()">
          <h1 class="mh-line-size-3 font-alt m-b-20 text-center">LOGIN:</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label class="sr-only" for="email">Your Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="YOUR EMAIL*"
              required=""
              data-validation-required-message="Please enter your email address."
            />
            <p class="help-block text-danger"></p>
          </div>

          <div class="form-group">
            <label class="sr-only" for="password">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              class="form-control"
              name="password"
              placeholder="PASSWORD*"
              required=""
              data-validation-required-message="Please enter a password."
              aria-invalid="false"
            />
            <p class="help-block text-danger"></p>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-block btn-round btn-d">Submit</button>
          </div>
        </form>
      </div>
      <div class="module-subtitle font-serif" style="padding-top: 10px">Let's go!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$emit("changeJwt");
          this.$router.push("/home");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
