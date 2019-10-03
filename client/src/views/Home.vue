<template>
  <div class="main_container" id="mainC">
    <header>
      <nav class="navbar fixed-top">
        <b-navbar id="nav_bar" toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#home">
            <img class="icon" src="../assets/Group2.svg">
            <span class="icon">Hush</span>
          </b-navbar-brand>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item  class="menuoption" href="#recent_posts">Discover</b-nav-item>
              <b-nav-item class= "menuoption" v-if= "!downL && !logged" @click="moveToLog()" right>Sign in</b-nav-item>
              <b-nav-item class= "menuoption" v-if= "downL && !logged" @click="moveToReg()" to="/" right>Register</b-nav-item>
              <b-nav-item class= "menuoption" v-if= "mod" right>Moderator</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </nav>
    </header>

    <div class="max_width_wrapper">
      <section>
        <div align="center" id="home">
          <img class="mask" src="../assets/mask.svg">
          <div id="recent_posts" style="height: 1500px; background-color:#FFFFF; color:#black;">
            <h2>TO BE FIXED</h2>
          </div>
        </div>
        <div class="title">Secrets & Truths</div>
        <div class="subtitle">Share your secret anonymously and be heard.</div>
        <div id="regLog">
          <b-card v-if="!downL && !logged" class="p-2">
            <RegItem/>                  <!-- Call to the Restration component -->
          </b-card>

          <b-card v-if="downL&& !logged" class="p-2">
            <LoginItem  v-on:signedIn="setLoggedIn($event)" />                <!-- Call to the Login component -->
          </b-card>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { Api } from '@/Api';
import RegItem from '@/components/RegItem';
import LoginItem from '@/components/LoginItem';
export default {
  name: 'home',
  data() {
    return {
      downL: false,
      logged: false,
      mod: false
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          this.message = error;
        });
    },
    moveToLog() {
      this.downL = true;
    },
    moveToReg() {
      this.downL = false;
    },
    setLoggedIn(response) {
      this.logged = response.data.user.loggedIn;
      this.mod = response.data.user.moderator;
      location.href = /Welcome/;
      // - creating cookies
      setCookies(response, 1);
    }

  },
  created: function () {
    var cook = JSON.parse(getCookieObj());
    if (cook != null) {
      if (cook.data.user.loggedIn == true) {
        this.logged = true;
        if (cook.data.user.moderator == true) {
          this.mod = true;
        } else {
          this.mod = false;
        }
      } else {
        this.logged = false;
        this.downL = false;
      }
    }
  },
  components: {
    RegItem,
    LoginItem
  }
};
function setCookies(response, extraDays) {
  // ------------------------making keyValues for cookies-----------------
  var moderatorKV = 'moderator' + '=' + response.data.user.moderator;
  var idKV = 'id' + '=' + response.data.user.id;
  var usernameKV = 'username' + '=' + response.data.user.username;
  var loggedInKV = 'loggedIn' + '=' + response.data.user.loggedIn;
  // ---------------------------expiry for the cookies--------------------
  var timeNow = new Date();
  timeNow.setTime(timeNow.getTime() + (extraDays * 0.1 * 60 * 60 * 1000));
  var expires = 'expires=' + timeNow.toUTCString();
  // -----------------------------------creating cookies------------------
  // Cookie String
  var cookie1 = moderatorKV + ';' + expires;
  var cookie2 = idKV + ';' + expires;
  var cookie3 = usernameKV + ';' + expires;
  var cookie4 = loggedInKV + ';' + expires;
  // Create cookie
  document.cookie = cookie1;
  document.cookie = cookie2;
  document.cookie = cookie3;
  document.cookie = cookie4;
}
// getting values from the cookies
function getCookieValue(cookieKey) {
  var cookiesList = document.cookie.split(';').map(function (cookie) {
    return cookie.trim();
  });
  for (var i = 0; i < cookiesList.length; i++) {
    var cookie = cookiesList[i].split('=');
    var key = cookie[0];
    var value = cookie[1];
    if (key === cookieKey) {
      return value;
    }
  }
  return undefined;
}
</script>
<style>
  html {
    scroll-behavior: smooth;
  }
  #regLog{
    position: absolute;
    top: 200px;
    right:50px;
    margin-right:50px;
    max-width: 300px;
  }
  .main_container {
    background: #2F303A;
    height: 100vh;
  }
  header, .max_width_wrapper {
    max-width: 1300px;
    margin:auto;
  }
  .nav{
    position: relative;

  }
  #nav_bar {
    background-color: #fff0!important;
    margin-top: 30px;
    width: 100%;
  }
  .menuoption {
    margin-right:50px;
  }
  .mask {
    width: 1000px !important;
    padding: 10px;
  }
  .title, .subtitle {
    position: absolute;
    top: 260px;
    font-size: 49px;
    color: #FFF5F5;
  }
  .subtitle {
    top: 340px;
    font-size: 25px;
  }
  .icon{
    position: relative;
  }
  @media (max-width: 991.98px) {
    .mask {
      display:none;
    }
    #regLog{
      top: 200px;
      left:5px;
      max-width: 250px;
      padding:0;
    }
    .card{
      top:200px;
      left:220px;
    }
  }
  @media (max-width: 1024.98px) {
    .title, .subtitle{
      left: 25px;
    }
    .card{
      top:200px;
    }

  }
  @media (max-width: 780.98px) {
    .card{
      left:400px;
    }
  }
  @media (max-width: 767.98px) {
    .mask {
      display:none;
    }
    .title{
      top: 130px;
      left: 10px;
      font-size: 25px;
    }
    .subtitle{
      top:170px;
      left: 10px;
      font-size: 16px;
    }
    .icon{
      bottom: 20px;
      right:15px;
    }
    #nav-collapse{
      bottom:10px;
    }
    .menuoption{
      margin-bottom: 40px!important;
      margin: 0px;
      font-size: 13px;
      right: 10px;
    }
    #regLog{
      top: 200px;
      left:5px;
      max-width: 500px;
      padding:0;
    }
    .card{
      top:10px;
      left:40px;
    }
  }
</style>
