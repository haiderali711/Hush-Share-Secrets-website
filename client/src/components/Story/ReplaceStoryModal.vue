<template>
  <modal :show="show" @close="close">
    <form @submit.stop.prevent="handleSubmit">
      <div class="modal-header">
        <h3>Replace Story</h3>
      </div>
      <div class="modal-body">

        <label class = "form-label">
          Title *
          <input
            v-model="title"
            rows="1"
            class="form-control"
          />
          <em v-if="show && titleIsRequired" style="color: red">Title is required.</em>
          </label>

        <label class="form-label">
          Content *
          <textarea
            v-model="storyContent"
            rows="4"
            class="form-control"
          >
            {{story.content}}
          </textarea>
          <em v-if="show && contentIsRequired" style="color: red">Content is required.</em>
          <em v-if="contentLenIsValid" style="color: red">Content length must be below 300 characters.</em>
        </label>
      </div>
      <div class="modal-footer text-right">
        <button class="modal-default-button" @click="close">Cancel</button>
        <button class="modal-default-button" :disabled="!formIsValid" @click="handleSubmit">Update</button>
      </div>
    </form>
  </modal>
</template>

<script>
import { Api } from '../../Api';
import Modal from '../shared/Modal/ModalTemplate';
import CookiesController from '../../utils/CookiesController.js';


export default {
  name: 'replace-story-modal', // <!-- story done -->
  props: ['show', 'story'], // <!-- story done-->

  data() {
    return {
      title: '',
      storyContent: ''
    };
  },
  components: {
    Modal
  },
  mounted() {

    this.user= CookiesController.getCookieValue("id");

  },
  computed: {
    titleIsRequired() {
      return this.title.length === 0;// <!-- story done -->
    },
    contentIsRequired() {
      return this.storyContent.length === 0;// <!-- story done -->
    },
    contentLenIsValid() {
      return this.storyContent.length > 300;// <!-- story done -->
    },
    formIsValid() {
      return !this.titleIsRequired && !this.contentIsRequired && !this.contentLenIsValid;// <!-- story DONE-->
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.title = this.story.title;// <!-- story ADDED TITLE -->
        this.storyContent = this.story.content;// <!-- story done -->
      }
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      Api.put(`stories/${this.story._id}`, { user: this.user,title: this.title, content: this.storyContent })// <!-- story done -->
        .then(response => {
          this.$props.story.user = CookiesController.getCookieValue("id");// <!-- story done -->
          this.$props.story.title = this.title;// <!-- story done -->
          this.$props.story.content = this.storyContent;// <!-- story done -->
        })
        .catch(error => {
          console.log(error);
        });

      console.log('handleSubmit', e);
      this.$emit('close', e);
    },
    close(e) {
      e.preventDefault();

      this.$emit('close', e);
      this.title = '';
      this.storyContent = '';// <!-- story done-->
    }
  }
};
</script>

<style scoped>
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .text-right {
    text-align: right;
  }

  .form-label {
    display: block;
    margin-bottom: 1em;
  }

  .form-label > .form-control {
    margin-top: 0.5em;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
  }
</style>
