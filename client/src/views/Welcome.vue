<template>
  <div>
    <grid>
      <div class="flip">
        <div class="front" style="background-color: #313131;">
          <h1 class="text-shadow">Posts</h1>
        </div>
        <div class="back">
          <b-link to="/posts/" center>
            <h2 style="color:white">Posts</h2>
            <p>Short and neat format for secrets you want to get of your chest quickly</p>
          </b-link>
        </div>
      </div>

      <div class="flip">
        <div class="front" style="background-color: #313131;">
          <h1 class="text-shadow">Stories</h1>
        </div>
        <div class="back">
          <b-link to="/stories/" center>
            <h2 style="color:white">Stories</h2>
            <p>Want to take your time and read longer secrets with more context, welcome to stories</p>
          </b-link>
        </div>
      </div>

      <div class="flip">
        <div class="front" style="background-color: #313131;">
          <h1 class="text-shadow">Profile</h1>
        </div>
        <div class="back">
          <h2>Profile</h2>
          <p>This is your space. You decide what to do with it</p>
        </div>
      </div>

      <div class="flip">
        <div class="front" style="background-color: #313131;">
          <h1 class="text-shadow">Upload</h1>
        </div>
        <div class="back">
          <h2>Upload</h2>
          <p>You have something on your heart and need to get it out. You will be anonymous. So share</p>
        </div>
      </div>

      <div class="flip">
        <div class="front" style="background-color: #313131;">
          <h1 class="text-shadow">Favorites</h1>
        </div>
        <div class="back">
          <h2>Favorites</h2>
          <p>You read it. You loved it. You Starred it! </p>
        </div>
      </div>
      <div class="flip">
        <div class="front">
          <h1 class="text-shadow">Sign out</h1>
        </div>
        <div class="back">
          <b-link v-if= "logged" @click="signOut()" right>
            <h2 style="color:white">Sign out</h2>
            <p>Are you sure you don't want to share with the world? If so, we hope to see you soon!</p>
          </b-link>
        </div>
      </div>
    </grid>
  </div>
</template>

<script>
import { Api } from '../Api';
import Grid from '../components/Grid';
import CookiesController from '../utils/CookiesController.js';

export default {
  name: 'welcome',
  data() {
    return {
      downL: false,
      logged: true,
      mod: false };
  },
  components: {
    Grid
  },
  created() {
    const cook = JSON.parse(CookiesController.getCookieObj());
    if (cook == null) location.href = '/#home/';
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    signOut() {
      this.downL = false;
      this.mod = false;
      this.logged = false;

      const resp = JSON.parse(CookiesController.getCookieObj());
      CookiesController.setCookies(resp, -1);

      location.href = '/#home/';
    },
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          this.message = error;
        });
    }
  }
};
</script>

<style scoped>
  .flip {
    /*position: relative;*/
    top:150px;
    /*margin-left: 80px;*/
  }
  .flip > .front, .flip > .back {
    /*display: block;*/
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 0.5s;
    transition-property: transform, opacity;
  }
  .flip > .front {
    transform: rotateY(0deg);
  }
  .flip > .back {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotateY(-180deg);
  }
  .flip:hover > .front {
    transform: rotateY(180deg);
  }
  .flip:hover > .back {
    opacity: 1;
    transform: rotateY(0deg);
  }
  .flip.flip-vertical > .back {
    transform: rotateX(-180deg);
  }
  .flip.flip-vertical:hover > .front {
    transform: rotateX(180deg);
  }
  .flip.flip-vertical:hover > .back {
    transform: rotateX(0deg);
  }
  .flip {
    position: relative;
    /*display: inline-block;*/
    /*margin-right: 2px;*/
    /*margin-bottom: 1em;*/
    /*width: 400px;*/
  }
  .flip > .front, .flip > .back {
    display: block;
    color: white;
    width: inherit;
    background-size: cover !important;
    background-position: center !important;
    height: 220px;
    padding: 1em 2em;
    background: #313131;
    border-radius: 10px;
  }
  .flip > .front p, .flip > .back p {
    font-size: 0.9125rem;
    line-height: 160%;
    color: #999;
  }
  .text-shadow {
    text-shadow: 1px 1px rgba(0, 0, 0, 0.04), 2px 2px rgba(0, 0, 0, 0.04), 3px 3px rgba(0, 0, 0, 0.04), 4px 4px rgba(0, 0, 0, 0.04), 0.125rem 0.125rem rgba(0, 0, 0, 0.04), 6px 6px rgba(0, 0, 0, 0.04), 7px 7px rgba(0, 0, 0, 0.04), 8px 8px rgba(0, 0, 0, 0.04), 9px 9px rgba(0, 0, 0, 0.04), 0.3125rem 0.3125rem rgba(0, 0, 0, 0.04), 11px 11px rgba(0, 0, 0, 0.04), 12px 12px rgba(0, 0, 0, 0.04), 13px 13px rgba(0, 0, 0, 0.04), 14px 14px rgba(0, 0, 0, 0.04), 0.625rem 0.625rem rgba(0, 0, 0, 0.04), 16px 16px rgba(0, 0, 0, 0.04), 17px 17px rgba(0, 0, 0, 0.04), 18px 18px rgba(0, 0, 0, 0.04), 19px 19px rgba(0, 0, 0, 0.04), 1.25rem 1.25rem rgba(0, 0, 0, 0.04);
  }
  .show {
    display: block;
  }
</style>
