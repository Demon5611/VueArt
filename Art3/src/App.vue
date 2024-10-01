<template>
<div class="app">
  <Navbar />
  <ScrollToTopButton />
  <RouterView />
  <Footer />
</div>
</template>

<script setup>
import Navbar from './components/pages/ui/Navbar.vue';
import ScrollToTopButton from './components/pages/ui/ScrollToTopButton.vue';
import Footer from './components/pages/ui/Footer.vue';
</script>

