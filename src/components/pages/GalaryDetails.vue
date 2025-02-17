<template>
  <div class="container">
    <h2>Подробнее о картинах</h2>

    <div class="foto" v-for="(foto, index) in fotos" :key="index">
      <img class="foto-image" :src="foto.image" :alt="foto.title" />
      <div class="foto-info">
        <h1>{{ foto.title }}</h1>
        <p class="price">{{ foto.price }} р.</p>
        <button class="buy-button">Купить</button>
        <p class="description">{{ foto.description }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

const fotos = ref([
  {
    title: "Маки",
    price: "8000",
    image: new URL("@/assets/gallaryDetils/Маки.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 50Х50",
  },
  {
    title: "Малиновка",
    price: "3500",
    image: new URL("@/assets/gallaryDetils/Малиновка.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 10Х15.",
  },
  {
    title: "Остановись",
    price: "1399",
    image: new URL("@/assets/gallaryDetils/Остановись.jpeg", import.meta.url).href,
    description: "Холст, акрил. Размер 150Х60",
  },
  {
    title: "Осязаемое счастье",
    price: "24000",
    image: new URL("@/assets/gallaryDetils/Осязаемое_счастье.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 60Х60",
  },
  {
    title: "Следуй за мечтой",
    price: "1599",
    image: new URL("@/assets/gallaryDetils/Следуй_за_мечтой.jpg", import.meta.url).href,
    description: "Любая дополнительная информация о композиции.",
  },
  {
    title: "Слава советскому спорту",
    price: "1799",
    image: new URL("@/assets/gallaryDetils/Спорт.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 50Х50",
  },
  {
    title: "Хурма в теплом тоне",
    price: "6000",
    image: new URL("@/assets/gallaryDetils/Хурма.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 20Х30",
  },
]);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 950px;
  margin: 0 auto;
}

.foto {
  display: flex;
  align-items: center;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
}

/* Для нечётных (1-я, 3-я, 5-я...) карточек делаем row-reverse */
.foto:nth-child(odd) {
  flex-direction: row-reverse;
}
/* Для чётных (2-я, 4-я, 6-я...) остаётся row по умолчанию */

/* Изображение */
.foto-image {
  width: 450px;
  height: 450px;
  object-fit: cover;
  border-radius: 2px;
  
}

/* Информация о картине */
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
}

.buy-button:hover {
  background-color: #d93737;
}

.description {
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
}

.back-button {
  max-width: 200px;
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 1rem;
  text-decoration: none;
  background-color: #ffb24d;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-bottom: 5%;
}

.back-button:hover {
  background-color: #e2f3c6;
}

/* Адаптив: при ширине меньше 768px, делаем вертикально */
@media (max-width: 768px) {
  .foto {
    flex-direction: column !important; /* Перекрываем row-reverse */
    text-align: center;
  }

  .foto-image {
    width: 100%;
    height: auto;
  }
}
</style>
