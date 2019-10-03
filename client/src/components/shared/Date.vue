<template>
  <span>{{formatDate}}</span>
</template>

<script>
export default {
  name: 'date',
  props: ['date'],
  data() {
    return {
      months: [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct',
        'Nov', 'Dec'
      ]
    };
  },
  computed: {
    formatDate() {
      let newDate = this.date.toString().slice(0, 10).split('-');
      newDate[1] = this.months[Number(newDate[1]) - 1];
      return newDate
        .reverse()
        .toString()
        .replace(',', ' ')
        .replace(',', ', ');
    }
  }
};
</script>
