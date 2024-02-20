<template>
  <div v-if="isVisible" class="scroll-to-top" @click="scrollToTop" @keydown="handleKeyDown" role="button" tabindex="0">
    <img alt="arrow_up"  src="../../icons/arrow_up.svg" style= "color:white"/>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';

export default {
  components: {
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
    // проверяет, прокрутилась ли страница на более чем 100 пикселей от верхнего края.

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    // что задали, то и вернули 
    return {
      isVisible,
      scrollToTop,
    };
  },
};
</script>

<style scoped>
</style>
