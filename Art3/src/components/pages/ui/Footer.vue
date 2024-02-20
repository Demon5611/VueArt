<template >
    <div>
        <div :class="{ 'footer-visible': isFooterVisible, footer: true }">© 2023 Production by D.S.</div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isFooterVisible = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  isFooterVisible.value = scrollY > 100; // если true, то 'footer-visible'
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<style scoped>    
</style>
