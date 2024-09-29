<template>
  <div id="gallery">
    <div v-for="(card, index) in cards" :key="index" class="card-container">
      <!-- Карточка изображения -->
      <ImageCard
        :imageUrl="card.imageUrl"
        @openModal="openModal(card)"
      />
      <!-- Текст рядом с изображением -->
      <div class="textAfterCard">
        <h4>{{ card.title }}</h4>
        <p>{{ card.description }}</p>
        <p class="material">{{ card.material }}</p>
      </div>
    </div>

    <!-- Модальное окно -->
    <Modal :modalActive="modalActiveRef" @close="closeModal">
      <img
        :src="modalImage"
        alt="Original Image in Modal"
        class="modal-image"
      />
      <div class="'modal-text'">
        <!-- <h3>{{ modalTitle }}</h3>
        <span>{{ modalMaterial }}</span> -->
      </div>
    </Modal>

    <a @click="handleDownloadCV" class="cv cv-cv">Скачать NataAvodesCV</a>
  </div>
</template>


<script setup>
import { ref } from "vue";
import NataAvodesCV from "../../assets/NataAvodesCV.pdf";
import { cardsData } from "../../data/cardsData";
import { downloadCVWithCache } from "../../services/fileDownloader";
import ImageCard from "../ImageCard.vue";
import Modal from "../Modal.vue";


const cards = ref(cardsData);

const modalActiveRef = ref(false);

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
.modal-image {
  max-width: 100%;
  max-height: 100%; 
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.cv-cv {
  padding-right:63%
  }
</style>
