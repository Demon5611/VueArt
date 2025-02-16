<template>
  <div :class="{ 'navbar-container': true, 'navbar-fixed': isNavbarFixed }">
    <img
      src="../../../assets/contactPage/logoNataAvodes.png"
      class="logo_navbar"
      alt="logo"
    />
    <ul class="nav nav-underline">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Главная</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ path: '/', hash: '#blog' }"
          >Проекты</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ path: '/', hash: '#gallery' }"
          >Галерея</router-link
        >
      </li>

      <li class="nav-item">
        <router-link class="nav-link" :to="{ path: '/', hash: '#contacts' }"
          >Контакты</router-link
        >
      </li>
    </ul>
  </div>
</template>



<script setup>
import { onMounted, onUnmounted, ref } from "vue";

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
