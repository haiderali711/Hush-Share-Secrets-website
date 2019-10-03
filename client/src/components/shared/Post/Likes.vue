<template>
  <button
    v-on:click="updateLikes"
    class="reaction_button"
    style="margin-right: 5px;"
  >
    <svg
      width="30"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="margin: -3px 0 0 -5px;"
    >
      <path
        d="M5 12L12 5L19 12M12 19V6V19Z"
        stroke="#495057"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"/>
    </svg>
    <span style="color: #495057">{{post.likes ? post.likes : 0}}</span>
  </button>
</template>
<script>
import { Api } from '../../../Api';

export default {
  name: 'likes',
  props: ['post'],
  methods: {
    updateLikes() {
      Api.patch(`posts/${this.post._id}`, { likes: ++this.post.likes })
        .then()
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
