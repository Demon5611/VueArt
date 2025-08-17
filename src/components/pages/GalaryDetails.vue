<template>
  <div class="container">
    <h2>Подробнее о картинах</h2>

    <!-- Отображаем только загруженные карточки -->
    <div class="foto" v-for="(foto, index) in visibleFotos" :key="index">
      <img
        class="foto-image"
        :src="foto.image"
        :alt="foto.title"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
      />
      <div class="foto-info">
        <h1>{{ foto.title }}</h1>
        <p class="price">{{ foto.price }} р.</p>
        <router-link to="/contactpage" class="buy-button"
          >Связаться</router-link
        >
        <router-link to="/basket" class="basket-button">Купить</router-link>
        <p class="description">
          {{ foto.description.split(". ")[0] }}
          <br v-if="foto.description.includes('. ')" />
          {{ foto.description.split(". ")[1] || "" }}
        </p>
      </div>
    </div>

    <!-- Сентинел для отслеживания прокрутки -->
    <div id="sentinel"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { allFotos } from "@/constants/galleryData";

const chunkSize = 3;
const visibleFotos = ref([]);
let currentIndex = 0;

function loadMore() {
  const nextChunk = allFotos.slice(currentIndex, currentIndex + chunkSize);
  if (nextChunk.length) {
    visibleFotos.value.push(...nextChunk);
    currentIndex += chunkSize;
  }
}

onMounted(() => {
  // Загружаем первую порцию карточек
  loadMore();

  const sentinel = document.querySelector("#sentinel");

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    {
      rootMargin: "200px",
    }
  );

  if (sentinel) {
    observer.observe(sentinel);
  }
});
</script>

