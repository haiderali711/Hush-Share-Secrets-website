<template>
  <div class="post_categories">
        <span
          v-for="category in categories.slice(0, 3)"
          :key="category._id"
        >#{{category.name}}</span>

    <div class="categories_dropdown" style="margin-left: -6px">
      <b-dropdown
        dropup
        right variant="link"
        toggle-class="text-decoration-none" no-caret
        v-if="categories.length > 3">
        <template v-slot:button-content class="drop_down_button">
          <img src="../../assets/moreCategories.svg" alt="see more categories">
        </template>
        <b-dropdown-item
          v-for="category in categories.slice(3)"
          :key="category._id"
        >
          {{category.name}}
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { Api } from '../../Api';

export default {
  name: 'post-categories',
  props: ['post'],
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      Api.get(`categories/posts/${this.post._id}`)
        .then(response => {
          this.categories = response.data.categories;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
  .post_categories > span {
    color: #495057cf;
    background-color: #EDF2F7;
    border-radius: 8px;
    padding: 3px 5px 4px;
    margin-right: 10px;
  }

  .post_categories .categories_dropdown {
    display: inline-block;
    margin-bottom: -5px;
  }
</style>
