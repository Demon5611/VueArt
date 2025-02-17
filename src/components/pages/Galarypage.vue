<template>
  <div id="gallery">
    <Head>
      <title>Галерея картин | Nata Avodes</title>
      <meta
        name="description"
        content="Коллекция картин от Nata Avodes. Просмотрите лучшие работы в галерее."
      />
      <meta
        name="keywords"
        content="картины, галерея, искусство, Nata Avodes, живопись, художник"
      />
      <meta name="author" content="Nata Avodes" />
      <meta property="og:title" content="Галерея картин | Nata Avodes" />
      <meta
        property="og:description"
        content="Коллекция картин от Nata Avodes. Просмотрите лучшие работы в галерее."
      />
      <meta property="og:image" content="/path-to-preview-image.jpg" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://nataavodes.ru/gallery" />
    </Head>

    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div class="carousel-inner">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <img
            loading="lazy"
            class="d-block w-100 carousel-img"
            :src="image"
            :alt="'Slide ' + (index + 1)"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      <router-link to="/gallery/details" class="button-about">Подробнее о картинах</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRouter } from "vue-router"; 

const router = useRouter();

const images = ref([
  new URL("@/assets/carusel/за мечтой.jpg", import.meta.url).href,
  new URL("@/assets/carusel/маки.jpg", import.meta.url).href,
  new URL("@/assets/carusel/остановись.jpg", import.meta.url).href,
  new URL("@/assets/carusel/осязаемая радость.jpg", import.meta.url).href,
  new URL("@/assets/carusel/птицы.jpg", import.meta.url).href,
  new URL("@/assets/carusel/слава спорту.jpg", import.meta.url).href,
  new URL("@/assets/carusel/хурма.jpg", import.meta.url).href,
]);

onMounted(() => {
  new bootstrap.Carousel(document.querySelector("#carouselExampleControls"), {
    interval: 4000,
    wrap: true,
  });
});

const goToDetails = () => {
  router.push({ path: "/gallery/details" }); 
};
</script>

<style scoped>

</style>
