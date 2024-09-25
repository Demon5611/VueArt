<template>
    <div class="textRight">
      <img :src="imageUrl" class="card" @click="openImage(imageUrl)" />
      <div class="textAfterCard">
        <h4>{{ title }}</h4>
        <p>{{ description }}</p>
        <p class="material">{{ material }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    imageUrl: String,
    title: String,
    description: String,
    material: String,
  });
  
  const openImage = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };
  </script>

  