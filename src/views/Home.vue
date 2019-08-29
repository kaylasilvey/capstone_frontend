<template>
  <div class="home">
    <div style="text-align: center;">
      <p>
        <a class="btn btn-border-d btn-round btn-lg" href="/signup" role="button">Let's Get Started!</a>
      </p>
      <h1>{{ message }}</h1>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      message: "A place for everything, and everything in its place..."
    };
  },
  created: function() {},
  methods: {}
};
</script>
