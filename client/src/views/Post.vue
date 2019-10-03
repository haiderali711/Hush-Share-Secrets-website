<template>
  <div class="post_modal_wrapper">
    <b-modal
      ref="detailedPostModal"
      size="lg"
      scrollable
      hide-footer
      @hide="changeRoute"
    >
      <template v-slot:modal-header>
        <div v-if="loading" style="height: 35px"></div>
        <div v-else class="post_modal_header">
          <div class="post_avatar_wrapper">
            <div class="post_avatar"></div>
            <span class="post_username">username</span>
          </div>
          <div v-if="post.user">
<!--            <p>{{post.user.group}}</p>-->
          </div>
          <button class="btn" v-on:click="hidePostModal">X</button>
        </div>
      </template>
      <div class="post_modal_content_wrapper">
        <div v-if="loading" class="text-center" style="margin-top: 40px;">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else class="content">
          <p class="my-4">
            {{post.content}}
          </p>
          <span class="date_and_reading_time">
            <date :date="post.published" /> • <reading-time :content="post.content" />
          </span>
          <post-categories :post="post"/>
          <post-footer :post="post"/>

          <comments :post="post"/>
        </div>
      </div>

      <div v-if="error" class="error">
        <strong>😫 Post with ID: {{id}} not found 😫.</strong>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { Api } from '../Api';
import Bookmark from '../components/shared/Bookmark';
import PostCategories from '../components/Post/PostCategories';
import PostFooter from '../components/Post/PostFooter';
import Date from '../components/shared/Date';
import ReadingTime from '../components/shared/ReadingTime';
import Comments from '../components/Post/Comments';

export default {
  name: 'post',
  props: ['id'],
  data() {
    return {
      post: {},
      loading: false,
      error: null
    };
  },
  components: {
    Date,
    ReadingTime,
    PostCategories,
    PostFooter,
    Comments
  },
  created() {
    this.fetchPost();
  },
  mounted() {
    this.showPost();
  },
  methods: {
    fetchPost() {
      this.error = this.post = null;
      this.loading = true;

      Api.get(`posts/${this.id}`)
        .then(response => {
          this.post = response.data;
          this.loading = false;
        })
        .catch(error => {
          this.post = {};
          this.loading = false;
          this.error = error.toString();
          console.log(error);
        });
    },
    showPost() {
      this.$refs['detailedPostModal'].show();
    },
    hidePostModal() {
      this.$refs['detailedPostModal'].hide();
    },
    changeRoute() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
  .post_modal_header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post_avatar_wrapper {
    display: flex;
    align-items: center;
  }

  .modal-body .post_modal_content_wrapper .content {
    padding: 1rem 1rem 0;
  }

  .post_avatar {
    background-color: #9FADBF;
    border-radius: 50%;
    height: 35px;
    width: 35px;
  }

  .post_username {
    margin-left: 14px;
  }

  .modal-body .post_modal_content_wrapper .date_and_reading_time {
    margin-bottom: 5px;
  }

  .modal-body .post_modal_content_wrapper .comments {
    margin-top: 10px;
  }
</style>
