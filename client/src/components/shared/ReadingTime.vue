<template>
  <span>{{readingTime}} min read</span>
</template>

<script>
import readingTime from 'reading-time';

export default {
  name: 'reading-time',
  props: ['content'],
  computed: {
    readingTime() {
      return Math.round(readingTime(this.content).minutes);
    }
  }
};
</script>
