<template>
  <div class="grid">
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'grid',
  props: ['grid']
};
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /*grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));*/
    grid-gap: 40px;
    /*padding: 20px;*/
  }

  @media (max-width: 991.98px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 767.98px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
