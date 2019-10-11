<template>
  <modal :show="show" @close="close($event)">
    <form @submit.stop.prevent="handleSubmit">
      <div class="modal-header">
        <h3>Create Post</h3>
      </div>
      <div class="modal-body">
        <label class="form-label">
          Content *
          <textarea
            v-model="postContent"
            rows="4"
            class="form-control"
            placeholder="Max 300 characters"
          >
          </textarea>
          <input type="text" style="display:none;">
          <em v-if="show && contentIsRequired" style="color: red">Content is required.</em>
          <em v-if="contentLenIsValid" style="color: red">Content length must be below 300 characters.</em>
        </label>
      </div>
      <div class="modal-footer text-right">
        <button class="modal-default-button" @click="close($event)">Cancel</button>
        <button class="modal-default-button" :disabled="!formIsValid" @click="handleSubmit($event)">Create</button>
      </div>
    </form>
  </modal>
</template>

<script>
import { Api } from '../../Api';
import Modal from '../shared/Modal/ModalTemplate';

export default {
  name: 'create-post-modal',
  props: ['show', 'posts'],
  data() {
    return {
      postContent: ''
    };
  },
  components: {
    Modal
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
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      let post = {
        content: this.postContent,
        user: '5d8433c7d0ab87a09351532d'
      };

      Api.post('posts', { content: post.content, user: post.user })
        .then(response => {
          this.posts.unshift(response.data);
          if (this.posts.length > 9) this.posts.pop();
        })
        .catch(error => {
          console.log(error);
        });

      this.$emit('close', e);
      this.postContent = '';
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
