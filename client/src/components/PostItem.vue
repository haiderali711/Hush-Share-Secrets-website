<template>
  <div class="post_container">
    <div class="post_content">
      <div class="post_header">
        <div class="post_avatar_wrapper">
          <div class="post_avatar"></div>
          <span class="post_username">username</span>
        </div>
        <div class="post_actions">
          <bookmark bookmarked="gold" fill-color="gold" v-bind:style="{ marginRight: '10px' }" />
          <img v-if="!loggedIn" src="../assets/moreActions.svg" alt="more actions">
          <b-dropdown v-if="loggedIn" right variant="link" toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content class="drop_down_button">
              <img src="../assets/moreActions.svg" alt="more actions">
            </template>
            <b-dropdown-item
              v-on:click="$emit('show-edit-post-modal', post._id)"
            >
              Edit Post
            </b-dropdown-item>
              <b-dropdown-item
              v-on:click="$emit('show-replace-post-modal', post._id)"
            >
              Replace Post
            </b-dropdown-item>

            <b-dropdown-item v-on:click="$emit('delete-post', post._id)">Delete Post</b-dropdown-item>
            <b-dropdown-item href="#">Report Post</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <p v-if="!loggedIn">{{post.content}}</p>
      <a v-if="loggedIn" href="#">
        <div v-on:click="$emit('show-detailed-post-modal', post)">
        <p class="post_excerpt">
          {{post.content}}
        </p>
        </div>
      </a>
      <span
        v-bind:style="{ color: '#495057c7' }"
      >
        <date :date="post.published" /> • <reading-time :content="post.content" />
      </span>
      <post-categories :post="post"/>
    </div>
    <post-footer :post="post" :loggedIn="loggedIn"/>
  </div>
</template>

<script>
import Bookmark from './shared/Bookmark';
import Date from './shared/Date';
import ReadingTime from './shared/ReadingTime';
import PostCategories from './Post/PostCategories';
import PostFooter from './Post/PostFooter';

export default {
  name: 'post-item',
  props: ['post', 'loggedIn'],
  data() {
    return {
      bookmarked: false
    };
  },
  components: {
    Bookmark,
    Date,
    ReadingTime,
    PostCategories,
    PostFooter
  },
  methods: {
  }
};
</script>

<style scoped>
  .post_container {
    color: #495057;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }

  .post_content {
    padding: 15px 20px 0 20px;
  }
  .post_content > a {
    color: inherit;
  }

  .post_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .post_excerpt {
    max-height: 81px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }

  .reactions > span > img {
    margin-top: -3px;
  }
</style>
