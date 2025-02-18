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

const allFotos = [
  {
    title: "Маки",
    price: "8000",
    image: new URL("@/assets/gallaryDetils/Маки.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 50Х50",
  },
  {
    title: "Малиновка",
    price: "5000",
    image: new URL("@/assets/gallaryDetils/Малиновка.jpg", import.meta.url)
      .href,
    description: "Холст, масло. Размер 10Х15.",
  },
  {
    title: "Остановись",
    price: "30000",
    image: new URL("@/assets/gallaryDetils/Остановись.jpeg", import.meta.url)
      .href,
    description: "Холст, акрил. Размер 150Х60",
  },
  {
    title: "Осязаемое счастье",
    price: "24000",
    image: new URL(
      "@/assets/gallaryDetils/Осязаемое_счастье.jpg",
      import.meta.url
    ).href,
    description: "Холст, масло. Размер 60Х60",
  },
  {
    title: "Следуй за мечтой",
    price: "10000",
    image: new URL(
      "@/assets/gallaryDetils/Следуй_за_мечтой.jpg",
      import.meta.url
    ).href,
    description: "Холст, масло - смешанная техника. Размер 50Х70",
  },
  {
    title: "Слава советскому спорту",
    price: "15000",
    image: new URL("@/assets/gallaryDetils/Спорт.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 50Х50",
  },
  {
    title: "Хурма в теплом тоне",
    price: "6000",
    image: new URL("@/assets/gallaryDetils/Хурма.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 20Х30",
  },
];

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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1100px;
  padding: 5%;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.foto {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
}

/* Для нечётных карточек — row-reverse */
.foto:nth-child(odd) {
  flex-direction: row-reverse;
}

.foto-image {
  width: 450px;
  height: 450px;
  object-fit: cover;
  border-radius: 2px;
}

.foto-info {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  align-items: flex-start;
}

h2 {
  font-size: 1.5rem;
  color: #000;
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
  margin: 5px 0;
}

.buy-button {
  max-width: 200px;
  background-color: #ffb24d;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  text-decoration: none;
}

.buy-button:hover {
  background-color: #d93737;
}

.description {
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
}

/* Адаптив для экранов меньше 768px */
@media (max-width: 768px) {
  .foto {
    flex-direction: column !important;
    text-align: center;
  }

  .foto-image {
    width: 100%;
    height: auto;
  }
}
</style>
