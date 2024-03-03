<template>
  <div :class="{ 'navbar-container': true, 'navbar-fixed': isNavbarFixed }">
    <img src="../../../assets/logoNataAvodes.png" class="logo_navbar" alt="logo" />
    <ul class="nav nav-underline">
      <li class="nav-item">
        <!-- якорная ссылка, где #main это id="main" на Mainpage.vue -->
        <a class="nav-link" href="#main">Главная</a> 
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#gallery">Галерея</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#contacts">Контакты</a>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted, ref } from 'vue';


const isNavbarFixed = ref(false); 
const handleScroll = () => {
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    isNavbarFixed.value = true;
  } else {
    isNavbarFixed.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
</style>
