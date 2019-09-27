<template>
  <div id="app">
    <div class="max_width_wrapper">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  background: #2F303A;
  height: 100vh;
}

.max_width_wrapper {
  max-width: 1400px;
  margin: auto;
}

</style>
