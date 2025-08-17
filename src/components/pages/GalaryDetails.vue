<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router"; // ← ОБЯЗАТЕЛЬНО
import { allFotos } from "@/constants/galleryData";
import { useCartStore } from "@/store/cart";

const router = useRouter();
const cart = useCartStore();

const chunkSize = 3;
const visibleFotos = ref([]);
let currentIndex = 0;
let observer = null;

function loadMore() {
  const nextChunk = allFotos.slice(currentIndex, currentIndex + chunkSize);
  if (nextChunk.length) {
    visibleFotos.value.push(...nextChunk);
    currentIndex += chunkSize;
  }
}

function addToCart(foto) {
  cart.addItem({
    id: foto.id,
    title: foto.title,
    price: foto.price, // уже число в constants
    image: foto.image,
    stock: 1, // для уникальных картин; убери/измени если нужен тираж
  });
  router.push("/basket");
}

onMounted(() => {
  cart.hydrate();
  loadMore();

  const sentinel = document.querySelector("#sentinel");
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMore();
    },
    { rootMargin: "200px" }
  );
  if (sentinel) observer.observe(sentinel);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="container">
    <h2>Подробнее о картинах</h2>

    <div class="foto" v-for="(foto, index) in visibleFotos" :key="foto.id">
      <img
        class="foto-image"
        :src="foto.image"
        :alt="foto.title"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
      />
      <div class="foto-info">
        <h1>{{ foto.title }}</h1>
        <p class="price">{{ foto.price.toLocaleString("ru-RU") }} р.</p>

        <router-link to="/contactpage" class="buy-button"
          >Связаться</router-link
        >
        <button class="basket-button" @click="addToCart(foto)">Купить</button>

        <p class="description">
          {{ foto.description.split(". ")[0] }}
          <br v-if="foto.description.includes('. ')" />
          {{ foto.description.split(". ")[1] || "" }}
        </p>
      </div>
    </div>

    <div id="sentinel"></div>
  </div>
</template>

<style scoped>
/* твои стили без изменений */
</style>
