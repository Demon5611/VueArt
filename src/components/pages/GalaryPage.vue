<template>
  <div id="gallery">
    <div class="carousel-container">
      <!-- Контейнер для слайдов -->
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}vw)` }"
      >
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          class="carousel-img"
          alt="Slide"
        />
      </div>
      <!-- Кнопки переключения слайдов с Unicode-стрелками -->
      <button @click="prev" class="carousel-control carousel-control-prev">
        ❮
      </button>
      <button @click="next" class="carousel-control carousel-control-next">
        ❯
      </button>
    </div>
    <div class="contaner-button">
    <!-- Ссылка для перехода на страницу деталей -->
    <router-link to="/gallery/details" class="button-about">
      Подробнее о картинах
    </router-link>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Массив изображений
const images = ref([
  new URL("@/assets/carusel/за мечтой.jpg", import.meta.url).href,
  new URL("@/assets/carusel/маки.jpg", import.meta.url).href,
  new URL("@/assets/carusel/остановись.jpg", import.meta.url).href,
  new URL("@/assets/carusel/осязаемая радость.jpg", import.meta.url).href,
  new URL("@/assets/carusel/птицы.jpg", import.meta.url).href,
  new URL("@/assets/carusel/слава спорту.jpg", import.meta.url).href,
  new URL("@/assets/carusel/хурма.jpg", import.meta.url).href,
]);

const currentIndex = ref(0);
let timer = null;

// Функция перехода к следующему слайду
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

// Функция перехода к предыдущему слайду
const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
};

// Автоматическая смена слайдов
onMounted(() => {
  timer = setInterval(next, 4000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

