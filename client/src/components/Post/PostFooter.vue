<template>
  <div class="post_footer">
    <div class="reactions">
      <likes :post="post" />
      <dis-likes :post="post"/>
    </div>
    <share :post="post"/>
  </div>
</template>

<script>
import Likes from '../shared/Post/Likes';
import DisLikes from '../shared/Post/DisLikes';
import Share from '../shared/Share';

export default {
  name: 'post-footer',
  props: ['post'],
  data() {
    return {
    };
  },
  components: {
    Likes,
    DisLikes,
    Share
  },
  methods: {
  }
};
</script>

<style>
  .post_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f5f7;
    border-radius: 0 0 10px 10px;
    margin-top: 11px;
    padding: 10px 20px 10px 20px;
  }
  .modal-body .post_modal_content_wrapper .post_footer {
    border-radius: 0;
    margin-left: -1rem;
    margin-right: -1rem;
  }

  .reactions > span > img {
    margin-top: -3px;
  }
  .reactions > span > img {
    margin-top: -3px;
  }

  .reaction_button {
    border: 0;
    background-color: transparent;
  }

  .reaction_button {
    border-radius: 5px;
  }

  .reaction_button:hover,
  .reaction_button:focus {
    border: 0;
    background-color: #E2E8F0;
  }

  .reaction_button:focus {
    outline: 0 solid #E2E8F0;
    outline-offset: -4px;
  }
</style>
