<template>
  <div class="main_container" id="mainC">
    <header>
      <nav class="navbar fixed-top">
        <b-navbar id="nav_bar" toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#home">
            <img class="icon" src="../assets/logo.svg" alt="logo">
            <span class="icon">Hush</span>
          </b-navbar-brand>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item  class="menuoption" href="#recent_posts">Discover</b-nav-item>
<!--              <b-nav-item class= "menuoption" v-if= "!downL && !logged" @click="moveToLog" right>Sign in</b-nav-item>-->
<!--              <b-nav-item class= "menuoption" v-if= "downL && !logged" @click="moveToReg" to="/" right>Register</b-nav-item>-->

              <b-nav-item class= "menuoption" v-if="!downL" @click="moveToLog" right>Sign in</b-nav-item>
              <b-nav-item class= "menuoption" v-if="downL" @click="moveToReg" to="/" right>Register</b-nav-item>
              <b-nav-item class= "menuoption" v-if= "mod" right>Moderator</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </nav>
    </header>

    <div class="max_width_wrapper">
      <section>
        <div id="home">
          <img class="mask" src="../assets/mask.svg" alt="mask image">
          <div id="recent_posts" style="height: 1500px; background-color:#FFF; color:#000;">
            <h2>TO BE FIXED</h2>
          </div>
        </div>

        <div class="title">Secrets & Truths</div>
        <div class="subtitle">Share your secret anonymously and be heard.</div>
        <div id="regLog">
          <b-card v-if="!downL" class="p-2">
            <RegItem/>
          </b-card>
          <b-card v-if="downL" class="p-2">
            <LoginItem  v-on:signedIn="setLoggedIn($event)" />
          </b-card>
        </div>

      </section>
    </div>
  </div>

</template>

<script>
import { Api } from '../Api'
import { setCookies, getCookieObj } from '../utils/CookiesController'
import RegItem from '../components/RegItem'
import LoginItem from '../components/LoginItem'

export default {
  name: 'home',
  data() {
    return {
      downL: false,
      logged: false,
      mod: false
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    moveToLog() {
      this.downL = true
    },
    moveToReg() {
      this.downL = false
    },
    setLoggedIn(response) {
      this.mod = response.data.user.moderator
      location.href = /Welcome/

      setCookies(response, 1)
    }
  },
  created: function () {
    var cook = JSON.parse(getCookieObj())
    if (cook != null) {
      if (cook.data.user.loggedIn === true) {
        this.logged = true
        this.mod = cook.data.user.moderator === true
      } else {
        this.logged = false
        this.downL = false
      }
    }
  },

  components: {
    RegItem,
    LoginItem
  }
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
