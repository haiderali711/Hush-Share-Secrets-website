<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  height: 100vh;
}

#app a {
  text-decoration: none;
}

nav {
  padding: 30px;
}

nav a {
  color: #ffff;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
