<template>
<div class="app">
    <Navbar/>
    <Mainpage/>
    <Galarypage/>
    <Contactpage/>
    <ScrollToTopButton />
    <Footer/>
</div>
</template>

<script setup>
import Contactpage from './components/pages/Contactpage.vue';
import Galarypage from './components/pages/Galarypage.vue';
import Mainpage from './components/pages/Mainpage.vue';
import Footer from './components/pages/ui/Footer.vue';
import Navbar from './components/pages/ui/Navbar.vue';
import ScrollToTopButton from './components/pages/ui/ScrollToTopButton.vue';

</script>



<style lang="scss">
.app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 2500px;
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
  font-size: 1.5ch;
  cursor: pointer;
  flex-grow: 1;
  width: 100%;;
  }
</style>
