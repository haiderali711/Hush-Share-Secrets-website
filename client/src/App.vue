<template>
  <main id="app">
    <nav-bar
      :login="login"
      :logged-in="loggedIn"
      :mod="mod"
      @move-to-login="moveToLogin"
      @move-to-reg="moveToReg"
      @sign-out="signOut"
    />
    <div class="content_wrapper">
      <div class="content">
        <router-view
          :login="login"
          :logged-in="loggedIn"
          :mod="mod"
          @set-logged-in="setLoggedIn"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { setCookies, getCookieObj } from './utils/CookiesController';
import NavBar from './components/NavBar';

export default {
  name: 'home',
  data() {
    return {
      login: false,
      loggedIn: false,
      mod: false
    };
  },
  components: {
    NavBar
  },
  created() {
    let cookie = JSON.parse(getCookieObj());

    if (cookie != null) {
      if (cookie.data.user.loggedIn === true) {
        this.loggedIn = true;
        this.mod = cookie.data.user.moderator === true;
      } else {
        this.login = false;
        this.loggedIn = false;
      }
    }
  },
  methods: {
    moveToLogin() {
      this.login = true;
    },
    moveToReg() {
      this.login = false;
    },
    setLoggedIn(response) {
      this.loggedIn = response.data.user.loggedIn;
      this.mod = response.data.user.moderator;
      location.href = /welcome/;

      setCookies(response, 1);
    },
    signOut() {
      this.login = true;
      this.loggedIn = false;
      this.mod = false;

      try {
        setCookies(JSON.parse(getCookieObj()), -1);
      } catch (e) {
        console.log(e);
      }

      location.href = '/';
    }
  }
};
</script>

<style>
  html {
    scroll-behavior: smooth;
  }

  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    line-height: 1.7;
    padding: 0;
    margin: auto;
    background-color: #fafafa;
    min-height: 100vh;
  }

  #app a {
    text-decoration: none;
  }
  .content_wrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1300px;
  }
  .content_wrapper .content {
    margin: 0 20px 20px 20px;
  }
</style>
