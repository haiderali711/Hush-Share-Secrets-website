<template>
  <div class="main_container2" >
    <div>
      <b-navbar id="nav_bar1" class="fixed-top" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/welcome">
          <img src="../assets/logo.svg">
          <span>Hush</span>
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item  class="menuoption1" to="/welcome">Main page</b-nav-item>
            <b-nav-item class= "menuoption1" to="/posts" center>Posts</b-nav-item>
            <b-nav-item  class="menuoption1" to="/stories">Stories</b-nav-item>
            <b-nav-item class= "menuoption" v-if= "logged" @click="signOut()" right>Sign Out</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

    </div>

    <div class="posts">
      <b-button type="button" class="createButton" @click="createStory">Create Story</b-button>
      <grid>
        <story-item
          v-for="story in stories"
          :key="story._id"
          :story="story"
          @show-edit-story-modal="editStoryModal"
          @delete-story="deleteStory"></story-item>
      </grid>

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
import { setCookies, getCookieObj } from '../utils/CookiesController';
import Grid from '../components/Grid';
import StoryItem from '../components/StoryItem';
import EditStoryModal from '../components/shared/Modal/EditStoryModal';
import CreateStoryModal from '../components/shared/Modal/CreateStoryModal';
import Paginate from 'vuejs-paginate';

export default {
  name: 'stories',
  data() {
    return {
      stories: [],
      totalPages: 0,
      storyToEdit: null,
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
    EditStoryModal,
    CreateStoryModal
  },
  mounted() {
    this.getStories();
  },
  methods: {
    signOut() {
      this.downL = false;
      this.mod = false;
      this.logged = false;

      // Deleting the Cookies
      try {
        setCookies(JSON.parse(getCookieObj()), -1);
      } catch (error) {
        console.log(error);
      }
      location.href = '/#home/';
    },
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
    getNextPage(page) {
      Api.get(`/storie?page=${page}`)
        .then(response => {
          this.$router.push(`/stories?page=${page}`);

          this.stories = response.data.docs;
        })
        .catch(error => {
          this.stories = [];
          console.log(error);
        });
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

<!--
this style should not be scoped
see, https://github.com/lokyoung/vuejs-paginate/issues/20
-->
<style>

  #nav_bar1 {
    background-color: #2F303A!important;
    width: 100%;

  }
  .main_container3 {
    background: #FFFF;
    height: 100vh;
  }
  .createButton {
    margin-top: 6em;
    margin-left:1em;
  }
  .pagination {
    justify-content: center;
    margin-top: 30px;
    padding-bottom: 20px;
  }
  .pagination > li {
    display: inline;
  }
  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .pagination > li > a:hover,
  .pagination > li > span:hover,
  .pagination > li > a:focus,
  .pagination > li > span:focus {
    z-index: 3;
    color: #23527c;
    background-color: #eee;
    border-color: #ddd;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .pagination > .disabled > span,
  .pagination > .disabled > span:hover,
  .pagination > .disabled > span:focus,
  .pagination > .disabled > a,
  .pagination > .disabled > a:hover,
  .pagination > .disabled > a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
  .pagination-lg > li > a,
  .pagination-lg > li > span {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
  }
  .pagination-lg > li:first-child > a,
  .pagination-lg > li:first-child > span {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .pagination-lg > li:last-child > a,
  .pagination-lg > li:last-child > span {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .pagination-sm > li > a,
  .pagination-sm > li > span {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
  }
  .pagination-sm > li:first-child > a,
  .pagination-sm > li:first-child > span {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .pagination-sm > li:last-child > a,
  .pagination-sm > li:last-child > span {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
</style>
