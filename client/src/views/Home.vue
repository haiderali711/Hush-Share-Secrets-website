
<template>
  <div class="main_container" id="mainC">
    <header>
      <nav class="navbar fixed-top">
        <b-navbar id="nav_bar" toggleable="lg" type="dark" variant="info">

          <b-navbar-brand href="#home">
            <img src="../assets/Group2.svg">
            <span>Hush</span>
          </b-navbar-brand>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item  class="menuoption" href="#recent_posts">Discover</b-nav-item>
              <b-nav-item class= "menuoption" v-if= "!downL && !logged" @click="moveToLog()" right>Sign in</b-nav-item>
              <b-nav-item class= "menuoption" v-if= "downL && !logged" @click="moveToReg()" to="/" right>Register</b-nav-item>
              <b-nav-item class= "menuoption" v-if= "mod" right>Moderator</b-nav-item>
              <b-nav-item class= "menuoption" v-if= "logged" @click="signOut()" right>Sign Out</b-nav-item>

             <!-- <router-link to="/mainpage">mainpage</router-link>-->
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
import RegItem from '@/components/RegItem'
import LoginItem from '@/components/LoginItem'

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
    moveToLog() {
      this.downL = true
    },
    moveToReg() {
      this.downL = false
    },
    setLoggedIn(response) {
      console.log(response)
      this.logged = response.data.user.loggedIn
      this.mod = response.data.user.moderator

      // - creating cookies
      createCookies(response)
    },
    signOut() {
      this.downL = false
      this.mod = false
      this.logged = false
    }
  },
  created: function () {
    this.downL = false
    this.mod = false
    this.logged = false
  },
  components: {
    RegItem,
    LoginItem
  }
}

function createCookies(response) {
  // ------------------------making keyValues for cookies-----------------
  var moderatorKV = 'moderator' + '=' + response.data.user.moderator
  var idKV = 'id' + '=' + response.data.user.id
  var usernameKV = 'username' + '=' + response.data.user.username
  var loggedInKV = 'loggedIn' + '=' + response.data.user.loggedIn

  // ---------------------------expiry for the cookies--------------------
  var timeNow = new Date()
  timeNow.setTime(timeNow.getTime() + 0.1 * 60 * 60 * 1000)
  var expires = 'expires=' + timeNow.toUTCString()

  // -----------------------------------creating cookies------------------
  // Cookie String
  var cookie1 = moderatorKV + ';' + expires
  var cookie2 = idKV + ';' + expires
  var cookie3 = usernameKV + ';' + expires
  var cookie4 = loggedInKV + ';' + expires

  // Create cookie
  document.cookie = cookie1
  document.cookie = cookie2
  document.cookie = cookie3
  document.cookie = cookie4
}

// // getting values from the cookies
// function getCookieValue(cookieKey) {
//   var cookiesList = document.cookie.split(';').map(function (cookie) {
//     return cookie.trim()
//   })

//   for (var i = 0; i < cookiesList.length; i++) {
//     var cookie = cookiesList[i].split('=')
//     var key = cookie[0]
//     var value = cookie[1]
//     if (key === cookieKey) {
//       return value
//     }
//   }
//   return undefined
// }

</script>

<style>
.main_container {
  background: #2F303A;
  height: 100vh;
}

header, .max_width_wrapper {
  max-width: 1300px;
  margin:auto;
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

#regLog{
  position: absolute;
  top: 200px;
  right:50px;
  margin-right:50px;
  max-width: 300px;

}

@media (max-width: 991.98px) {
    .mask {
display:none;    }
  }

  @media (max-width: 767.98px) {
    .mask {
display:none;  }
  }
</style>>
