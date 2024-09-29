<template>
  <div>
    <img :src="imageUrl" class="card" @click="handleClick" alt="card"/>
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

const emit = defineEmits(['openModal']);

const handleClick = () => {
  emit('openModal');
};
</script>
