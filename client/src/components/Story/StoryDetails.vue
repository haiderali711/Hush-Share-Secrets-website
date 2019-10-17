<template>
  <modal :show="show">
    <div class="post_modal_header">
      <div class="post_avatar_wrapper">
        <div class="post_avatar"></div>
        <span class="post_username">{{userN}}</span>
      </div>
<!--      <div v-if="story.user">-->
<!--      </div>-->
      <button class=" btn close_button" @click="close">X</button>
    </div>
    <div class="header_bottom_border"></div>

    <div class="post_modal_content_wrapper">
      <div class="post_detailed_content">
        <h4>{{story.title}}</h4>
        <p class="my-4">
          {{story.content}}
        </p>
        <span class="date_and_reading_time">
            <date :date="story.published" /> • <reading-time :content="story.content" />
          </span>
      </div>
    </div>
  </modal>
</template>

<script>
import { Api } from '../../Api';
import Modal from '../shared/Modal/ModalTemplate';
import Date from '../shared/Date';
import ReadingTime from '../shared/ReadingTime';

export default {
  name: 'story-details',
  props: ['show', 'story'],
  data() {
    return {
      userN : ""
    };
  },
  components: {
    Modal,
    Date,
    ReadingTime
  },
  methods: {
    getUsername(id){
      Api.get('/users/'+id)
        .then(response => {
          this.userN = response.data.username;
        })
        .catch(error => {
          console.log(error.response)
        });
    },
    close(e) {
      this.$emit('close', e);
    }
  },
  mounted(){
    this.getUsername(this.story.user);
  }
};
</script>

<style>
</style>
