<template>
  <div class="app">
    <div class="navbar-placeholder"></div> 
    <Navbar />
    <ScrollToTopButton />
    <router-view />
    <div ref="endOfAppPage" class="end-marker" />

    <Footer :isVisible="isFooterVisible" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Navbar from "./components/ui/Navbar.vue";
import ScrollToTopButton from "./components/ui/ScrollToTopButton.vue";
import Footer from "./components/ui/Footer.vue";

const isFooterVisible = ref(false);
const endOfAppPage = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isFooterVisible.value = entry.isIntersecting;
    },
    { root: null, threshold: 1.0 }
  );

  if (endOfAppPage.value) observer.observe(endOfAppPage.value);

  onUnmounted(() => {
    if (endOfAppPage.value) observer.unobserve(endOfAppPage.value);
  });
});
</script>



<style scoped>
Footer {
  opacity: 0;
  transition: opacity 0.4s ease;
}
Footer.show {
  opacity: 1;
}
</style>