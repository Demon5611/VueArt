<template>
  <div :class="{ 'navbar-container': true, 'navbar-fixed': isNavbarFixed }">
    <img src="../../../../public/logoNataAvodes.png" class="logo_navbar" alt="logo" />
    <ul class="nav nav-underline">
      <li class="nav-item">
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
import { onMounted, onUnmounted } from 'vue';


const data = {
  isNavbarFixed: false,
};

const methods = {
  handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      data.isNavbarFixed = true;
    } else {
      data.isNavbarFixed = false;
    }
  },
};

onMounted(() => {
  window.addEventListener("scroll", methods.handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", methods.handleScroll);
});
</script>

<style>
</style>

<!-- <script lang="js">
export default {
  data() {
    return {
      isNavbarFixed: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollY = window.scrollY;

      // При скролле на 100px меняем состояние фиксации и цвета фона
      if (scrollY > 100) {
        this.isNavbarFixed = true;
      } else {
        this.isNavbarFixed = false;
      }
    }
  }
};
</script> -->
