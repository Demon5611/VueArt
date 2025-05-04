<template>
  <div :class="{ 'navbar-container': true, 'navbar-fixed': isNavbarFixed }">
    <img
      src="../../assets//contactPage/logoNataAvodes.png"
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
import { computed } from "vue";
import { useScrollStore } from "@/store/useScrollStore";

const { scrollY } = useScrollStore();
const isNavbarFixed = computed(() => scrollY.value > 100);
</script>
