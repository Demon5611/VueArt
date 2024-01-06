<template>
  <div class="app">
  <Navbar/>
  <div>hello</div>
</div>
</template>

<script setup>
import Navbar from './components/pages/ui/Navbar.vue'

</script>
<style>
.app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  line-height: 1.5;
  font-weight: 400;

  background-color: rgb(242, 242, 242);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  font-size: 20px;

  font-family: 'Montserrat', sans-serif;
  text-align: center;

  /* display: contents; //убирает заливку бэк  */
}
</style>
