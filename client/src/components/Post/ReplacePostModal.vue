<template>
  <modal :show="show" @close="close">
    <form @submit.stop.prevent="handleSubmit">
      <div class="modal-header">
        <h3>Replace Post</h3>
      </div>
      <div class="modal-body">

        <label class="form-label">
          Content *
          <textarea
            v-model="postContent"
            rows="4"
            class="form-control"
          >
            {{post.content}}
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
  name: 'replace-post-modal',
  props: ['show', 'post'], 

  data() {
    return {
      postContent: ''
    };
  },
  components: {
    Modal
  },
  mounted() {
    this.user= CookiesController.getCookieValue("id");

  },
  computed: {
    contentIsRequired() {
      return this.postContent.length === 0;
    },
    contentLenIsValid() {
      return this.postContent.length > 300;
    },
    formIsValid() {
      return !this.contentIsRequired && !this.contentLenIsValid;
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.postContent = this.post.content;
      }
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      Api.put(`posts/${this.post._id}`, { user: this.user, content: this.postContent })
        .then(response => {
          this.$props.post.user = CookiesController.getCookieValue("id");
          this.$props.post.content = this.postContent;
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
      this.postContent = '';
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
