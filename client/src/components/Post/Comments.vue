<template>
  <div>
    <strong style="display: inline-block; margin: 20px 0 20px;">Comments</strong>
    <div v-if="loading" class="text-center" style="margin-bottom: 20px;">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-else>
      <div>
        <div style="margin-left: -1rem; margin-right: -1rem">
          <div
            v-for="(comment, index) in comments"
            :key="comment._id"
            :style="{
              position: 'relative',
              display: 'block',
              padding: '1rem 1.25rem',
              marginBottom: '-1px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: `${(index / 2) === 0 ? '#f7fafc' : '#fff'}`
            }"
          >
            <div style="display: flex; align-items: center;">
              <div style="
                background-color: #9FADBF;
                border-radius: 50%;
                margin-right: 10px;
                height: 20px;
                width: 20px;"
              >
              </div>
<!--              <span v-if="comment.user.username">{{comment.user.username.slice(0, 5)}}</span>-->
              <span>{{comment.user}}</span>
              <date :date="comment.published" style="margin-left: 10px"/>
          </div>
            <div style="margin-top: 15px">
              <span>
                {{comment.content}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="text-center" style="margin-bottom: 20px;">
      <strong v-if="comments.length === 0" style="display: inline-block;margin-bottom: 10px;">No comments!!</strong>
      <strong v-else>😫 Unable to load comments 😫.</strong>
    </div>

    <form class="comments_form">
      <input v-model="newComment.content" placeholder="add new comment">
      <button type="submit" @click="createComment($event)">Submit</button>
    </form>
  </div>
</template>

<script>
import { Api } from '../../Api';
import Date from '../shared/Date';
import CookiesController from '../../utils/CookiesController.js';


export default {
  name: 'comments',
  props: ['post'],
  data() {
    return {
      comments: [],
      loading: false,
      error: null,
      newComment: {
        content: '',
        user: '',
        post: this.post._id
      }
    };
  },
  components: {
    Date
  },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.loading = true;

      Api.get(`/posts/${this.post._id}/comments`)
        .then(response => {
          this.comments = response.data.comments;
          console.log(this.comments);
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.error = error.toString();
          console.log(error);
        });
    },
    createComment(e) {
      e.preventDefault();

      Api.post(`/posts/${this.post._id}/comments`,
        {
          content: this.newComment.content,
          post: this.newComment.post,
          user: CookiesController.getCookieValue("id")
        }
      )
        .then(response => {
          this.comments.push(response.data);
          this.newComment.content = '';
          this.error = '';
        })
        .catch(error => {
          this.error = error.toString();
          console.log(error);
        });
    }
  }
};
</script>

<style>
  .comments_form {
    background-color: #fff;
    margin-top: 15px;
    margin-bottom: -10px;
    display: flex;
    position: sticky;
    bottom: -15px;
  }
  .comments_form input {
    flex-grow: 4;
    margin: 0 10px;
    padding: 5px 5px 5px 20px;
    border-radius: 5px;
    border: 1px solid #e2e8f0;
    background-color: #edf2f7;
    box-shadow: none;
  }
  .comments_form input:hover,
  .comments_form input:focus {
    border-color: #e2e8f0;
    background-color: #fff;
  }
  .comments_form button {
    border-radius: 5px;
  }
</style>
