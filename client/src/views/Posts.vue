<template>
  <div class="posts">
    <b-button type="button" class="createButton" @click="createPost">Create Post</b-button>
          <b-button type="button" class="createButton" @click="deleteAllPosts">Delete All Posts</b-button>

    <grid>
      <post-item
        v-for="post in posts"
        :key="post._id"
        :post="post"
        :loggedIn="loggedIn"
        @show-detailed-post-modal="detailedPostModal"
        @show-edit-post-modal="editPostModal"                
        @show-replace-post-modal="ReplacePostModal"

        @delete-post="deletePost"></post-item>
    </grid>

    <post-details
      v-if="postDetailsToShow"
      :post="postDetailsToShow"
      :show="showDetailedPostModal"
      :loggedIn="loggedIn"
      @close="hideDetailedPostModal"
    />

    <edit-post-modal
      v-if="postToEdit"
      :post="postToEdit"
      :show="showEditPostModal"
      @close="showEditPostModal = false"
    />

      <replace-post-modal
        v-if="postToReplace"
        :post="postToReplace"
        :show="showReplacePostModal"
        @close="showReplacePostModal = false"
      />

    <create-post-modal
      :show="showCreatePostModal"
      :posts="posts"
      @close="showCreatePostModal = false"
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
        :clickHandler="getPosts"
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
</template>

<script>
import { Api } from '../Api';
import Paginate from 'vuejs-paginate';
import CookiesController from '../utils/CookiesController';
import Grid from '../components/Grid';
import PostItem from '../components/PostItem';
import PostDetails from '../components/Post/PostDetails';
import EditPostModal from '../components/Post/EditPostModal';
import ReplacePostModal from '../components/Post/ReplacePostModal';
import CreatePostModal from '../components/Post/CreatePostModal';

export default {
  name: 'posts',
  props: ['loggedIn'],
  data() {
    return {
      posts: [],
      totalPages: 0,
      postDetailsToShow: null,
      postToEdit: null,
      postToReplace: null,
      showDetailedPostModal: false,
      showEditPostModal: false,
      showReplacePostModal: false,
      showCreatePostModal: false,
      downL: false,
      logged: true,
      mod: false
    };
  },
  components: {
    Grid,
    PostItem,
    PostDetails,
    EditPostModal,    
    ReplacePostModal,
    CreatePostModal,
    Paginate
  },
  created: () => {
    const cook = JSON.parse(CookiesController.getCookieObj());
    if (cook == null) location.href = '/#home/';
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts(page) {
      const pageNum = page || this.$route.query.page;
      const limit = this.$route.query.limit;

      const url = `/posts?page=${pageNum}&limit=${limit}`;

      Api.get(url)
        .then(response => {
          this.posts = response.data.docs;
          this.totalPages = response.data.totalPages;
        })
        .catch(error => {
          this.posts = [];
          console.log(error);
        });
    },
    detailedPostModal(post) {
      this.showDetailedPostModal = true;
      this.postDetailsToShow = post;
    },
    hideDetailedPostModal() {
      this.showDetailedPostModal = false;
      this.postDetailsToShow = null;
    },
    editPostModal(id) {
      this.showEditPostModal = true;
      let index = this.posts.findIndex(post => post._id === id);
      this.postToEdit = this.posts[index];
    },
    ReplacePostModal(id) {
      this.showReplacePostModal = true;
      let index = this.posts.findIndex(post => post._id === id);
      this.postToReplace = this.posts[index];
    },
    createPost() {
      this.showCreatePostModal = true;
    },
    deletePost(id) {
      Api.delete(`/posts/${id}`)
        .then(response => {
          let index = this.posts.findIndex(post => post._id === id);
          this.posts.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },
       deleteAllPosts(){
      Api.delete('/posts')  
      .then(response => {
        this.stories = [];
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
  .createButton {
    margin-bottom: 1em;
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
