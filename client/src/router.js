import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Posts from './views/Posts.vue';
import Stories from './views/Stories.vue';
import Welcome from './views/Welcome.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/stories',
      name: 'stories',
      component: Stories
    }
  ]
});
