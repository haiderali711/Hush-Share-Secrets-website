<template>
  <button
    v-on:click="updateDisLikes"
    class="reaction_button"
    style="margin-right: 5px;"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="margin-top: -3px; margin-left: -5px"
    >
      <path
        d="M19 12L12 19L5 12M12 5L12 18L12 5Z"
        stroke="#495057"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span style="color: #495057">{{post.dislikes ? post.dislikes : 0}}</span>
  </button>
</template>
<script>
import { Api } from '../../Api';

export default {
  name: 'dis-likes',
  props: ['post', 'loggedIn'],
  methods: {
    updateDisLikes() {
      if (this.loggedIn) {
        Api.patch(`posts/${this.post._id}`, { dislikes: ++this.post.dislikes })
          .then()
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
