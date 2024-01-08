<template>
<div class="app">
    <Navbar/>
    <Mainpage/>
    <Galarypage/>
    <Contactpage/>
    <Footer/>
</div>
</template>

<script setup>
import Navbar from './components/pages/ui/Navbar.vue';
import Mainpage from './components/pages/Mainpage.vue';
import Galarypage from './components/pages/Galarypage.vue';
import Contactpage from './components/pages/Contactpage.vue';
import Footer from './components/pages/ui/Footer.vue';

</script>



<style lang="scss">
.app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 2500px;
  line-height: 1.5;
  font-weight: 400;
  // background-color: rgb(242, 242, 242);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  font-size: 20px;

  font-family: 'Montserrat', sans-serif;
  text-align: center;
}
</style>
