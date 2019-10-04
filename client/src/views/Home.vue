<template>
  <div class="main_container">
    <section>
      <div class="grid_wrapper">
        <div class="slogan">
          <div class="title">Secrets & Truths</div>
          <div class="subtitle">Share your secret anonymously and be heard.</div>
        </div>
        <div class="login_form">
          <div v-if="!login">
            <RegItem/>
          </div>

          <div v-if="login">
            <LoginItem  @signed-in="setLoggedIn" />
          </div>
        </div>
      </div>
    </section>
    <div id="recent_posts"
         style="
            max-width: 1300px;
            margin: 40px auto 40px auto;"
    >
      <div style="margin: 0 10px;">
        <h3 v-if="posts.length !== 0" style="margin-bottom: 40px;">Recent Posts</h3>
        <grid v-if="posts.length >= 1">
          <post-item
            v-for="post in posts"
            :key="post._id"
            :post="post"
          ></post-item>
        </grid>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '../Api';
import RegItem from '../components/RegItem';
import LoginItem from '../components/LoginItem';
import Grid from '../components/Grid';
import PostItem from '../components/PostItem';

export default {
  name: 'home',
  props: ['login', 'loggedIn', 'mod'],
  data() {
    return {
      posts: []
    };
  },
  components: {
    RegItem,
    LoginItem,
    Grid,
    PostItem
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      Api.get('posts?limit=6')
        .then(response => {
          this.posts = response.data.docs;
        })
        .catch(error => {
          this.posts = [];
          console.log(error);
        });
    },
    setLoggedIn(response) {
      this.$emit('set-logged-in', response);
    }
  }
};
</script>

<style>
  .main_container {
    position: absolute;
    left: 0;
    right: 0;
    background: #2F303A;
    height: 100vh;
  }
  .main_container section {
    min-height: 100vh;
    padding-top: 150px;
    /*background-image: url("../assets/mask.svg");*/
    /*background-color: #2F303A;*/
    /*height: 500px;*/
    /*width: 1000px !important;*/
    /*max-height: 800px;*/
    /*background-position: center;*/
    /*background-repeat: no-repeat;*/
    /*background-size: cover;*/
    /*position: relative;*/
  }
  .main_container section .grid_wrapper {
    display: grid;
    /*grid-template-columns: repeat(auto-fit,minmax(270px,1fr));*/
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 40px;
    padding: 20px;
  }

  .main_container section .grid_wrapper .slogan {
    grid-column: 3 / 7;
  }

  .main_container section .grid_wrapper .login_form {
    grid-column: 7 / 12;
    margin-left: 200px;
    max-width: 320px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
  }
  .mask {
    /*margin-left: auto;*/
    /*margin-right: auto;*/
    display: block;
    width: 1000px !important;
    max-height: 800px;
  }
  .title, .subtitle {
    font-size: 49px;
    color: #FFF5F5;
  }
  .subtitle {
    top: 340px;
    font-size: 25px;
  }
  @media (max-width: 991px) {
  }

  @media (max-width: 1024px) {
    .main_container section .grid_wrapper .slogan {
      grid-column: 1 / 7;
    }

    .main_container section .grid_wrapper .login_form {
      margin-left: 0;
      grid-column: 8 / 12;
      max-width: 300px;
    }

    .title, .subtitle{
      left: 25px;
    }
  }

  @media (max-width: 780px) {
    .main_container section .grid_wrapper .slogan {
      grid-column: 1 / 12;
    }

    .main_container section .grid_wrapper .login_form {
      grid-column: 1 / 12;
    }
  }

  @media (max-width: 767px) {
    .main_container section .grid_wrapper .login_form {
      margin-left: 0;
    }

    .main_container section .grid_wrapper .slogan {
      grid-column: 1 / 12;
    }

    .main_container section .grid_wrapper .login_form {
      grid-column: 1 / 12;
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
  }
</style>
