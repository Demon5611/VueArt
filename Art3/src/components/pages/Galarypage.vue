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
      <img :src="modalImage" alt="Original Image in Modal" class="modal-image" />
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
  modalImage.value = card.originalImageUrl; // Открываем оригинальное изображение
  modalTitle.value = card.title;
  modalMaterial.value = card.material;
  modalActiveRef.value = true; // Открываем модальное окно
};

const closeModal = () => {
  modalActiveRef.value = false;
};

const handleDownloadCV = () => {
  downloadCVWithCache(NataAvodesCV, "NataAvodesCV.pdf");
};
</script>

<style scoped>
.modal-image {
  max-width: 100%; /* Масштабируем изображение по ширине модального окна */
  max-height: 100%; /* Ограничиваем высоту изображения */
  object-fit: contain; /* Сохраняем пропорции изображения */
  display: block;
  margin: 0 auto; /* Центрируем изображение */
}
</style>
