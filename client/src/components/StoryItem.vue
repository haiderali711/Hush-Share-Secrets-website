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
          <b-dropdown right variant="link" toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content class="drop_down_button">
              <img src="../assets/moreActions.svg" alt="more actions">
            </template>
            <b-dropdown-item
              v-on:click="$emit('show-edit-story-modal', story._id)">
            
              Edit Story
            </b-dropdown-item>
            <b-dropdown-item v-on:click="$emit('delete-story', story._id)">Delete Story</b-dropdown-item>
            <b-dropdown-item href="#">Report Story</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <router-link
        :to="{ path: `/stories/${story._id}`, story: story}" > 
        <div v-on:click="$emit('show-detailed-story-modal', story._id)">
          <h4>{{story.title}}</h4>
          <p class="post_excerpt"> 
            {{story.content}}
          </p>
        </div>
      </router-link>
      <span v-bind:style="{ color: '#495057c7' }">
        <date :date="story.published" /> • 
      </span>
      <!-- <post-categories :story="story"/> -->
    </div>
    <!-- <post-footer :story="story"/> -->
  </div>
</template>

<script>
import Bookmark from './shared/Bookmark';
import Date from './shared/Date';
// import ReadingTime from './shared/ReadingTime';
// import PostCategories from './post/PostCategories'; 
// import PostFooter from './Post/PostFooter'; 

export default {
  name: 'story-item',  
  props: ['story'], 
  data() {
    return {
      bookmarked: false
    };
  },
  components: {
    Bookmark,
    Date
    // ReadingTime,
    // PostCategories,  
    // PostFooter      
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

  /*.post_avatar_wrapper {*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*}*/
  /*.post_avatar {*/
  /*  background-color: #9FADBF;*/
  /*  border-radius: 50%;*/
  /*  height: 35px;*/
  /*  width: 35px;*/
  /*}*/
  /*.post_username {*/
  /*  margin-left: 14px;*/
  /*}*/

  .post_excerpt {
    max-height: 81px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }

  /*.post_footer {*/
  /*  display: flex;*/
  /*  justify-content: space-between;*/
  /*  align-items: center;*/
  /*  background-color: #f1f5f7;*/
  /*  border-radius: 0 0 10px 10px;*/
  /*  margin-top: 11px;*/
  /*  padding: 10px 20px 10px 20px;*/
  /*}*/

  .reactions > span > img {
    margin-top: -3px;
  }

  /*.reaction_button {*/
  /*  border: 0;*/
  /*  background-color: transparent;*/
  /*}*/

  /*.reaction_button {*/
  /*  border-radius: 5px;*/
  /*}*/

  /*.reaction_button:hover,*/
  /*.reaction_button:focus {*/
  /*  border: 0;*/
  /*  background-color: #E2E8F0;*/
  /*}*/

  /*.reaction_button:focus {*/
  /*  outline: 0 solid #E2E8F0;*/
  /*  outline-offset: -4px;*/
  /*}*/
</style>
