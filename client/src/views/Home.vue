
<template>
  <div class="main_container" >
  
    <div>    
      <nav class="navbar fixed-top">
        <b-navbar id="nav_bar" toggleable="lg" type="dark" variant="info">
  
          <b-navbar-brand href="#home">
            <img src="../assets/Group2.svg">
            <span>Hush</span>
          </b-navbar-brand>
          
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item  class="menuoption" href="#recent_posts">Discover</b-nav-item>
              <b-nav-item class= "menuoption" href="#" right>Sign in</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
      
        </b-navbar>
      </nav>
    </div>


    <main>
      <div align="center" id="home">
        <img class="mask" src="http://clipart-library.com/images_k/masquerade-mask-silhouette/masquerade-mask-silhouette-10.png"  >
      </div>

      <div class="title">Secrets & Truths</div>
      <div class="subtitle">Share your secret anonymously and be heard.</div>
    </main>
 
    <div id="recent_posts" style="height: 1500px; background-color:#2F303A; color:#FFFFFF;">
      <h2>Recent Posts</h2>
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

#nav_bar {
  background-color: #fff0!important;
  padding-top: 30px;
  width: 100%;
}

.icon{
  position: absolute;
  left:36px; 
  top: 30px;
  bottom: 0%;
}

.title{
  position: absolute;
  width: 599px;
  height: 78px;
  left: 75px;
  top: 260px;
  font-size: 49px;
  color: #FFF5F5;
}

.subtitle{
  position: absolute;
  height: 78px;
  left: 80px;
  top: 340px;
  font-size: 25px;
  color: #FFF5F5;
}

.name{
  position: absolute;
  top: 30px;
  left: 98px;
  font-weight: normal;
  font-size: 30px;
  color:#FFFFFF;
}
.mask{
  width: 1000px;
  height:680px;
  opacity:0.3;
  padding: 10px;
}

.main_container {
  background: #2F303A;
  height: 100vh;
}

main{
  max-width: 1300px;
  margin:auto;
}

.menuoption{
  margin-right:50px;
}

</style>
