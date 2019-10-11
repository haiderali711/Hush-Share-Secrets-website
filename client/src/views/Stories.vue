<template>
  <div>
    <div class="posts">
      <b-button type="button" class="createButton" @click="createStory">Create Story</b-button>
      <grid>
        <story-item
          v-for="story in stories"
          :key="story._id"
          :story="story"
          @show-detailed-story-modal="detailedStoryModal"
          @show-edit-story-modal="editStoryModal"
          @delete-story="deleteStory"></story-item>
      </grid>

      <story-details
        v-if="storyDetailsToShow"
        :story="storyDetailsToShow"
        :show="showDetailedStoryModal"
        @close="showDetailedStoryModal = false"
      />

      <edit-story-modal
        v-if="storyToEdit"
        :story="storyToEdit"
        :show="showEditStoryModal"
        @close="showEditStoryModal = false"
      />

      <create-story-modal
        :show="showCreateStoryModal"
        :stories="stories"
        @close="showCreateStoryModal = false"
      />

      <div v-if="totalPages > 1">
        <paginate
          :page-count="totalPages"
          :margin-pages="4"
          :page-range="4"
          :containerClass="'pagination'"
          :pageClass="'page-item'"
          :pageLinkClass="'page-link-item'"
          :prevClass="'prev-item'"
          :prevLinkClass="'prev-link-item'"
          :nextClass="'next-item'"
          :nextLinkClass="'next-link-item'"
          :breakViewClass="'break-view'"
          :breakViewLinkClass="'break-view-link'"
          :clickHandler="getStories"
        >
        <span slot="breakViewContent">
          <svg width="16" height="4" viewBox="0 0 16 4">
            <circle fill="#999999" cx="2" cy="2" r="2" />
            <circle fill="#999999" cx="8" cy="2" r="2" />
            <circle fill="#999999" cx="14" cy="2" r="2" />
          </svg>
        </span>
        </paginate>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '../Api';
import Paginate from 'vuejs-paginate';
import CookiesController from '../utils/CookiesController';
import Grid from '../components/Grid';
import StoryItem from '../components/StoryItem';
import EditStoryModal from '../components/Story/EditStoryModal';
import CreateStoryModal from '../components/Story/CreateStoryModal';
import StoryDetails from '../components/Story/StoryDetails';

export default {
  name: 'stories',
  data() {
    return {
      stories: [],
      totalPages: 0,
      storyToEdit: null,
      showDetailedStoryModal: false,
      storyDetailsToShow: null,
      showEditStoryModal: false,
      showCreateStoryModal: false,
      downL: false,
      logged: true,
      mod: false
    };
  },
  components: {
    Grid,
    StoryItem,
    Paginate,
    StoryDetails,
    EditStoryModal,
    CreateStoryModal
  },
  mounted() {
    this.getStories();
  },
  created() {
    const cook = JSON.parse(CookiesController.getCookieObj());
    if (cook == null) {
      location.href = '/#home/';
    }
  },
  methods: {
    getStories(page) {
      const pageNum = page || this.$route.query.page;
      const limit = this.$route.query.limit;

      const url = `/stories?page=${pageNum}&limit=${limit}`;

      Api.get(url)
        .then(response => {
          this.stories = response.data.docs;
          this.totalPages = response.data.totalPages;
        })
        .catch(error => {
          this.stories = [];
          console.log(error);
        });
    },
    detailedStoryModal(story) {
      this.showDetailedStoryModal = true;
      this.storyDetailsToShow = story;
    },
    editStoryModal(id) {
      this.showEditStoryModal = true;
      let index = this.stories.findIndex(story => story._id === id);
      this.storyToEdit = this.stories[index];
    },
    createStory() {
      this.showCreateStoryModal = true;
    },
    deleteStory(id) {
      Api.delete(`/stories/${id}`)
        .then(response => {
          let index = this.stories.findIndex(story => story._id === id);
          this.stories.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
  .createButton {
    margin-top: 6em;
  }
</style>
