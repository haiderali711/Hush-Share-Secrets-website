<template>
  <transition name="modal-template">
    <div class="modal-mask" @click="close" v-show="show">
      <div class="modal-container" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: ['show'],
  mounted() {
    this.addEscapeEvent(event);
  },
  methods: {
    close(e) {
      e.preventDefault();
      this.$emit('close');
    },
    addEscapeEvent(event) {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.close(event);
        }
      });
    }
  }
};
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }

  .modal-container {
    max-width: 500px;
    border-radius: 10px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .modal-template-enter {
    opacity: 0;
  }

  .modal-template-leave-active {
    opacity: 0;
  }

  .modal-template-enter .modal-container,
  .modal-template-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
