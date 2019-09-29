
<template>
  <div class="main_container">
    <header>
    <div class="nav">
    <nav class="navbar fixed-top">
        <b-navbar id="nav_bar"  type="dark" variant="info">
  
          <b-navbar-brand href="#home">
            <img class="icon" src="../assets/Group2.svg">
            <span class="icon">Hush</span>
          </b-navbar-brand>
          
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item  class="menuoption" href="#recent_posts">Discover</b-nav-item>
              <b-nav-item class= "menuoption" href="#" right>Sign in</b-nav-item>
            <!-- <router-link class="menuoption" to="/mainpage">mainpage</router-link>-->
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </nav>
    </div>
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
    </section>
  </div>
  </div>
  
</template>

<script>
  // @ is an alias to /src
import { Api } from '@/Api'
import HomeLogo from '../assets/Group2.svg'


export default {
  name: 'home',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    this.getMessage()
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
    }
  }
}

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

  
}

@media (max-width: 1024.98px) {
.title, .subtitle{
  left: 25px;
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
}

</style>>
