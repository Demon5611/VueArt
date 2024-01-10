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
import { onMounted, onUnmounted, ref } from 'vue';

// зпеременные data и methods не видны внутри функций, таких как onMounted и onUnmounted. переменные,но  определенные в блоке <script setup>, автоматически импортируются внутрь хуков жизненного цикла, и не нужно использовать data и methods.  
// мы использовали ref для переменной isNavbarFixed, и теперь она доступна без использования data. Также, метод handleScroll теперь является стрелочной функцией для корректного привязывания контекста выполнения.



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
