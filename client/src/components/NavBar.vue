<template>
  <header>
    <div class="max_width">
      <div class="nav_content">
        <router-link to="/welcome">
          <img src="../assets/logo.svg" alt="logo">
          <span style="color: #fff">Hush</span>
        </router-link>
        <div class="nav_links">
          <a v-if="!loggedIn" href="#recent_posts">Discover</a>
          <a href="#" v-if="!loggedIn && !login" @click="$emit('move-to-login')">Sign in</a>
          <a href="#" v-if="login" @click="$emit('move-to-reg')">Register</a>
          <router-link v-if="loggedIn" to="/welcome">Main page</router-link>
          <router-link v-if="loggedIn" to="/posts">Posts</router-link>
          <router-link v-if="loggedIn" to="/stories">Stories</router-link>
          <a href="#" v-if="loggedIn" @click="$emit('sign-out')">Sign out</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'nav-bar',
  props: ['login', 'loggedIn', 'mod']
};
</script>

<style>
  header {
    background-color: #2F303A;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100 !important;
  }
  header .max_width {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
  header .nav_content {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
    padding: 0.666em 0 0.666em 0;
  }
  header .nav_content .nav_links {
    display: flex;
    align-items: center;
  }
  header .nav_content .nav_links > a {
    color: #fff;
  }
  header .nav_content .nav_links > a:nth-child(n + 1) {
    margin-right: 30px;
  }
</style>
