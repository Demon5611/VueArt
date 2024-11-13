<template>
  <div id="gallery">
    <div v-for="(card, index) in cards" :key="index" class="card-container">
      <ImageCard 
        :imageUrl="card.imageUrl"
        :borderImageUrl="card.borderImageUrl" 
        @openModal="openModal(card)"
      />
      <div class="textAfterCard">
        <h4 class="card_title">{{ card.title }}</h4>
        <p>{{ card.description }}</p>
        <p class="material">{{ card.material }}</p>
      </div>
    </div>

    <Modal :modalActive="modalActiveRef" @close="closeModal">
      <img
        :src="modalImage"
        alt="Original Image in Modal"
        class="modal-image"
      />
      <div class="'modal-text'"></div>
    </Modal>

    <a @click="handleDownloadCV" href="#" class="cv cv_download">Скачать NataAvodesCV</a>
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

const openModal = (card) => {
  modalImage.value = card.originalImageUrl; 
  modalActiveRef.value = true;
};

const closeModal = () => {
  modalActiveRef.value = false;
};

const handleDownloadCV = () => {
  downloadCVWithCache(NataAvodesCV, "NataAvodesCV.pdf");
};
</script>

