<template>
  <div>
    <b-dropdown
      dropup right variant="link"
      toggle-class="text-decoration-none" no-caret
      v-bind:style="{ marginRight: '10px' }"
    >
      <template v-slot:button-content class="drop_down_button">
        <img src="../../assets/share.svg" alt="share post on social media">
      </template>

      <b-dropdown-item
        :href="`https://twitter.com/intent/tweet?text=${post.content}&ampurl=some url`"
        target=_blank
      >
        Twitter
      </b-dropdown-item>
      <b-dropdown-item
        :href="`https://www.facebook.com/sharer.php?u=https://insegreto.com/it/seg/XN8MbaXKoB`"
        target=_blank
      >
        Facebook
      </b-dropdown-item>
      <b-dropdown-item
        :href="`mailto:?subject=${post.content}&amp;body=${post.content}: link`"
        target=_blank
      >
        Email
      </b-dropdown-item>
    </b-dropdown>
    <span>
      <img src="../../assets/comments.svg" alt="number of comments">
      {{commentCount}}
      <span style="margin-left: 5px;"></span>
    </span>
  </div>
</template>

<script>
import { Api } from '../../Api';

export default {
  name: 'share',
  props: ['post'],
  data() {
    return {
      commentCount: 0
    };
  },
  mounted() {
    this.getCommentsCount();
  },
  methods: {
    getCommentsCount() {
      Api.get(`/posts/${this.post._id}/comments?count=true`)
        .then(response => {
          this.commentCount = response.data.count;
          console.log(this.commentCount);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
