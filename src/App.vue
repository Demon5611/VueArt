<template>
  <div class="app">
    <Navbar />
    <ScrollToTopButton />
    <router-view></router-view>
    <div ref="endOfAppPage" class="end-marker"></div>
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
