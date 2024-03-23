<template>
  <div v-show="isModalOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close-btn" @click="closeModal">&#10006;</span>
      <img :src="imageSrc" alt="Modal Image" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';

const { imageSrc: imageSrcProp, isModalOpen: isModalOpenProp } = defineProps(['imageSrc', 'isModalOpen']);
const isModalOpen = ref(false);

onMounted(() => {
  isModalOpen.value = false; // Установите начальное значение isModalOpen из props
});

const closeModal = () => {
  console.log('Closing modal');
  isModalOpen.value = false;
};

watch(() =>
{
  console.log('isModalOpenProp', isModalOpenProp)
  isModalOpen.value = isModalOpenProp;
}, { immediate: true });
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
}
</style>
