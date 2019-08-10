<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          src="/docs/4.3/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        <h1>
          Mise en.
          <small class="text-muted">everything in its place.</small>
        </h1>
        <a href="/login">Login</a>
        |
        <a href="/logout">Logout</a>
        |
        <a href="/signup">Signup</a>
      </a>
    </nav>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
