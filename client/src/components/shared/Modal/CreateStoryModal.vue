<template>
  <modal :show="show" @close="close">
    <form @submit.stop.prevent="handleSubmit">
      <div class="modal-header">
        <h3>Edit Story</h3>
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
          <em v-if="show && titleLenIsValid" style="color: red">Title length must be below 100 characters.</em>
          </label>

        <label class="form-label">
          Content *
          <textarea
            v-model="storyContent"
            rows="4"
            class="form-control"
          >
        </textarea>
          <em v-if="show && contentIsRequired" style="color: red">Content is required.</em>
          <em v-if="contentLenIsValid" style="color: red">Content length must be below 300 characters.</em>
        </label>
      </div>
      <div class="modal-footer text-right">
        <button class="modal-default-button" @click="close">Cancel</button>
        <button class="modal-default-button" :disabled="!formIsValid" @click="handleSubmit">Create</button>
      </div>
    </form>
  </modal>
</template>

<script>
import { Api } from '../../../Api';
import Modal from './ModalTemplate';

export default {
  name: 'create-story-modal',
  props: ['show', 'stories'],
  data() {
    return {
      title:'',
      storyContent: ''
    };
  },
  components: {
    Modal
  },
  computed: {
    titleIsRequired() {
      return this.title.length === 0;
    },
    titleLenIsValid() {
      return this.title.length > 100;
    },
    contentIsRequired() {
      return this.storyContent.length === 0;
    },
    contentLenIsValid() {
      return this.storyContent.length > 300;
    },
    formIsValid() {
      return !this.titleIsRequired && !this.titleLenIsValid && !this.contentIsRequired && !this.contentLenIsValid;
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      let story = {
        title: this.title,
        content: this.storyContent,
        user: '5d889acfaad4ada6bdae383a'
      }

      Api.post(
        'stories',
        { title: story.title, content: story.content, user: story.user })
        .then(response => {
          this.stories.unshift(response.data);
          this.stories.pop();
        })
        .catch(error => {
          console.log(error);
        });

      this.$emit('close', e);
    },
    close(e) {
      e.preventDefault();
      this.$emit('close', e);
      this.title = '';
      this.storyContent = '';//<!-- story done-->
    }
  }
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

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
