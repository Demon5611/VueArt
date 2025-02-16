<template>
    <div class="container">
      <div class="foto" v-for="(foto, index) in fotos" :key="index">
        <img class="foto-image" :src="foto.image" :alt="foto.title" />
        <div class="foto-info">
          <h2>{{ foto.title }}</h2>
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
      title: "Бургундская роза и гвоздика",
      price: "2399",
      image: "/src/assets/fotos/burgundy-rose.jpg",
      description:
        "В букете использованы белые и пурпурные розы, красный гиперикум и ветви эвкалипта Baby Blue. По желанию вы можете добавить стандартную или подарочную упаковку к заказу.",
    },
    {
      title: "Кремовая роза и ромашка",
      price: "1999",
      image: "/src/assets/fotos/cream-rose.jpg",
      description:
        "Этот небольшой букет состоит из кремовых роз, полевых ромашек, эвкалипта Baby Blue и белой вероники. По желанию вы можете добавить стандартную или подарочную упаковку к заказу.",
    },
    {
      title: "Розовая роза и гвоздика",
      price: "2499",
      image: "/src/assets/fotos/pink-rose.jpg",
      description:
        "Этот букет состоит из нежных розовых роз, вероники, гвоздики, альстромерии и амми. По желанию вы можете добавить стандартную или подарочную упаковку к заказу.",
    },
  ]);
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .foto {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .foto:nth-child(even) {
    flex-direction: row-reverse;
  }
  
  .foto-image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .foto-info {
    display: flex;
    flex-direction: column;
    max-width: 400px;
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
    background-color: #ff4d4d;
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
  
  @media (max-width: 768px) {
    .foto {
      flex-direction: column;
      text-align: center;
    }
  
    .foto:nth-child(even) {
      flex-direction: column;
    }
  
    .foto-image {
      width: 100%;
      height: auto;
    }
  }
  </style>
  