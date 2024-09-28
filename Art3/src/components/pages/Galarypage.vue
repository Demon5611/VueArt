<template>
  <div id="gallery">
    <!-- Рендеринг карточек динамически -->
    <ImageCard
      v-for="(card, index) in cards"
      :key="index"
      :imageUrl="card.imageUrl"
      :title="card.title"
      :description="card.description"
      :material="card.material"
      @openModal="openModal(card)"
    />

    <!-- Модальное окно -->
    <Modal :modalActive="modalActiveRef" @close="closeModal">
      <img :src="modalImage" alt="Image in Modal" />
      <div class="'modal-text'">
        <!-- <h3>{{ modalTitle }}</h3>
        <span>{{ modalMaterial }}</span> -->
      </div>
    </Modal>

    <a @click="handleDownloadCV" class="cv">Скачать NataAvodesCV</a>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { cardsData } from "../../data/cardsData"; 
import ImageCard from "../ImageCard.vue";
import Modal from "../Modal.vue";

// Реактивный массив карточек
const cards = ref(cardsData);

const modalActiveRef = ref(false);

// Данные для модального окна
const modalImage = ref("");
const modalTitle = ref("");
const modalMaterial = ref("");


const openModal = (card) => {
  modalImage.value = card.originalImageUrl; 
  modalTitle.value = card.title;
  modalMaterial.value = card.material;
  modalActiveRef.value = true; 
};

const closeModal = () => {
  modalActiveRef.value = false;
};

const handleDownloadCV = () => {
  downloadCVWithCache(NataAvodesCV, "NataAvodesCV.pdf");
};
</script>

<style scoped>

</style>
