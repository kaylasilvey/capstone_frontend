<template>
  <div class="signup">
    <div class="container">
      <div class="form-group" style="padding-top: 30px">
        <form id="contact-form" role="form" novalidate="" v-on:submit.prevent="submit()">
          <h1 class="mh-line-size-3 font-alt m-b-20 text-center">Sign Up:</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label class="sr-only" for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control"
              name="name"
              placeholder="Name*"
              required=""
              data-validation-required-message="Please enter your name."
              aria-invalid="false"
              style="text-transform: uppercase;"
            />
            <p class="help-block text-danger"></p>
          </div>

          <div class="form-group">
            <label class="sr-only" for="email">Your Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Your E-mail*"
              required=""
              data-validation-required-message="Please enter your email address."
              style="text-transform: uppercase;"
            />
            <p class="help-block text-danger"></p>
          </div>

          <div class="form-group">
            <label class="sr-only" for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              name="password"
              placeholder="PASSWORD*"
              required=""
              data-validation-required-message="Please enter a password."
              aria-invalid="false"
            />
            <p class="help-block text-danger"></p>
          </div>

          <div class="form-group">
            <label class="sr-only" for="password">Password Confirmation</label>
            <input
              type="password"
              v-model="passwordConfirmation"
              id="passwordConfirmation"
              class="form-control"
              name="passwordConfirmation"
              placeholder="PASSWORD CONFIRMATION*"
              required=""
              data-validation-required-message="Passwords do not match"
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
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
