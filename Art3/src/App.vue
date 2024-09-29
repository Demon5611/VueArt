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



<style lang="scss">
.app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: auto;
  line-height: 1.5;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}
.cv {
  font-size: 1.8ch;
  font-style: italic;
  cursor: pointer;
  position: static;

  }
</style>
