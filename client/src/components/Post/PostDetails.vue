<template>
  <modal :show="show">
    <div class="post_modal_header">
      <div class="post_avatar_wrapper">
        <div class="post_avatar"></div>
        <span class="post_username">username</span>
      </div>
      <div v-if="post.user">
      </div>
      <button class=" btn close_button" @click="close">X</button>
    </div>
    <div class="header_bottom_border"></div>

    <div class="post_modal_content_wrapper">
      <div class="post_detailed_content">
        <p class="my-4">
          {{post.content}}
        </p>
        <span class="date_and_reading_time">
            <date :date="post.published" /> • <reading-time :content="post.content" />
          </span>
        <post-categories :post="post"/>
        <post-footer
          :post="post"
          :loggedIn="loggedIn"
          style="margin-left: -30px!important;
                 margin-right: -30px;
                 border-radius: 0;"
        />
        <comments :post="post"/>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '../shared/Modal/ModalTemplate';
import PostCategories from '../Post/PostCategories';
import PostFooter from '../Post/PostFooter';
import Date from '../shared/Date';
import ReadingTime from '../shared/ReadingTime';
import Comments from '../Post/Comments';

export default {
  name: 'post-details',
  props: ['show', 'post', 'loggedIn'],
  data() {
    return {
    };
  },
  components: {
    Modal,
    Date,
    ReadingTime,
    PostCategories,
    PostFooter,
    Comments
  },
  methods: {
    close(e) {
      this.$emit('close', e);
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
    padding-bottom: 15px;
    margin-bottom: 10px;
  }

  .post_modal_header .close_button:hover,
  .post_modal_header .close_button:focus {
    background-color: #E2E8F0;
  }

  .header_bottom_border {
    margin-left: -30px;
    margin-right: -30px;
    border-bottom: 1px solid #9FADBF;
  }

  .post_avatar_wrapper {
    display: flex;
    align-items: center;
  }

  .modal-body .post_modal_content_wrapper .post_detailed_content {
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
