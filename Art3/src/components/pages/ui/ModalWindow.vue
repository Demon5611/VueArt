<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&#10006;</span>
        <img :src="imageSrc" alt="Modal Image" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const imageSrc = ref('');
  
  const closeModal = () => {
    // закрыть модальное окно, например, перейдя на предыдущий маршрут
    $router.go(-1);
  };
  
  onMounted(() => {
    // Получаем параметры из маршрута
    imageSrc.value = $route.params.imageSrc;
  });
  </script>
  
  <style scoped>
  /* Стили для модального окна */
  /* ... */
  </style>
  