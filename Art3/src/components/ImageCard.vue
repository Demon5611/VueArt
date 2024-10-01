<template>
  <div class="card" :style="cardStyle" @click="handleClick">
    <img :src="imageUrl" alt="Image in Card" />
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  imageUrl: String,
  borderImageUrl: String,
});

const emit = defineEmits(["openModal"]);

const handleClick = () => {
  emit("openModal");
};

const cardStyle = computed(() => ({
  border: "10px solid transparent" /* Размер рамки */,
  "border-image-source": `url(${props.borderImageUrl})` /* Динамическое изображение для рамки */,
  "border-image-slice": "30" /* Срезаем части изображения для рамки */,
  "border-image-width": "10px" /* Ширина изображения-рамки */,
  "border-image-repeat": "stretch" /* Растягиваем изображение на всю рамку */,
}));
</script>
