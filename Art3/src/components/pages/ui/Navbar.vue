<template>
  <div :class="{ 'navbar-container': true, 'navbar-fixed': isNavbarFixed }">
    <img src="../../../../public/logoNataAvodes.png" class="logo_navbar" alt="logo" />
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

<!-- onMounted в Vue.js является хуком жизненного цикла, который выполняется после момента монтирования компонента. Этот хук предоставляет удобное место для выполнения кода, связанного с инициализацией компонента, такого как установка слушателей событий, запросы к API, или другие действия, которые должны произойти сразу после того, как компонент станет видимым на странице.
onMounted(() => { window.addEventListener("scroll", methods.handleScroll); }) используется хук onMounted. Когда компонент монтируется, он добавляет слушатель события прокрутки (scroll) к объекту window и привязывает к нему метод handleScroll.

onUnmounted(() => { window.removeEventListener("scroll", methods.handleScroll); });: Здесь используется хук onUnmounted. Когда компонент демонтируется, он удаляет слушатель события прокрутки, чтобы избежать утечек памяти.

Таким образом, этот код создает компонент, который при монтировании начинает отслеживать событие прокрутки и устанавливает значение isNavbarFixed в зависимости от положения прокрутки. Когда компонент демонтируется, слушатель события удаляется, чтобы избежать лишних действий после удаления компонента.
+ еще onUpdated (выполняется после каждого обновления компонента) или onBeforeUnmount (выполняется перед началом процесса демонтажа), в зависимости от сценария использования. -->