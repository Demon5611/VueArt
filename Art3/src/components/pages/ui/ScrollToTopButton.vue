<template>
    <div v-if="isVisible" class="scroll-to-top" @click="scrollToTop" @keydown="handleKeyDown" role="button" tabindex="0">
      <font-awesome-icon icon="arrow-up" />
    </div>
  </template>
  
  <script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, onUnmounted, ref } from 'vue';
  
  export default {
    components: {
      FontAwesomeIcon,
    },
    setup() {
      const isVisible = ref(false);
  
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
  
      const handleScroll = () => {
        isVisible.value = window.pageYOffset > 100;
      };
  
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          scrollToTop();
        }
      };
  
      onMounted(() => {
        window.addEventListener('scroll', handleScroll);
      });
  
      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
      });
  
      return {
        isVisible,
        scrollToTop,
        handleKeyDown,
      };
    },
  };
  </script>
  
  <style scoped>

  </style>
  