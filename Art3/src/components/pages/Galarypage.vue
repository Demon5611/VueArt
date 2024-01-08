<template>
    <div id="gallery">
      <div class="containerTextGalaryTop">
        <h3 class="h3_textTop">Кто мы такие и куда направляемся?</h3>
        <br />
        <p style="text-indent: 2ch;">
          Этот вопрос не раз ставил меня в тупик, потому что я родитель, и в то же время, обладаю
          любопытством ребенка, выросшего в семье ученых. Скажем по-другому. Для меня это второй
          вопрос после "Есть ли Господь?". Я думаю, что ответ уже ясен из заглавной буквы слова
          "Господь". Но как насчет остального?
        </p>
        <div class="containerTextGalaryRightALL">
          <div class="textRight1">
            <h3 class="h1_1" style="margin-top: 1ch;">ПРОЦЕСС ЭВОЛЮЦИИ</h3>
            <p style="text-indent: 2ch;">
              Это яркий вызов современной реальности Нет ничего хуже интеллектуальных шор навязанных
              нам….Кем навязанных? Социальными предрассудками, бизнесом и личными интересами
              отдельных групп людей. Каждая картина заставляет задуматься о том, что делают люди
              КАЖДЫЙ ДЕНЬ. Мы на пути эволюции или деградации как вида? Решать тебе…
            </p>
            <p class="material">Материал: смешанная техника, графика. Размеры работ 80/100см</p>
          </div>
  
          <div class="textRight2">
            <h3 class="h2_2">КОРОЛЕВ</h3>
            <p style="text-indent: 2ch;">Размышление на тему живопись и любимый город</p>
  
            <p class="material">Материал: масло, пастель; графика. Размеры работ 30/40см</p>
          </div>
  
          <div class="textRight3">
            <h3 class="h3_3">МИГРАЦИОННЫЙ ЗАХВАТ</h3>
            <p style="text-indent: 2ch;">
              Эта проблема больше чем вам всем кажется… Слишком много людей мигрируют по странам и
              континентам – вы все еще сомневаетесь? Посмотрите статистику. Смешение культур, расс,
              ценностей… Давайте порассуждаем вместе..
            </p>
            <p class="material">
              Материал: цифровая графика, коллаж, печать на пенокартоне. Размеры работ 80/120см
            </p>
          </div>
        </div>
  
        <div class="image-container">
      <div v-for="(image, index) in imagesData" :key="image.id || index" @click="openModal(image.src, image.title, image.description)">
        <div class="card" style="width: 18rem;">
          <img :src="image.src" />
          <div class="card-body">
            <p class="card-text">{{ image.title }}</p>
            <p class="card-text">{{ image.description }}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
      <!-- <a href="/path/to/NataAvodesCV.pdf" style="float: right; font-size: 1ch;" class="cv" download="NataAvodesCV.pdf">
        Скачать CV NataAvodes
      </a> -->
  
      <Modal :show="showModal" @hide="closeModal" size="lg" centered>
        <Modal.Body>
          <img :src="selectedImage || ''" alt="Selected" style="width: 100%" />
          <h5>{{ selectedTitle }}</h5>
        <p>{{ selectedDescription }}</p>
        </Modal.Body>
      </Modal>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
//   import NataAvodesCV from '../../assets/srcfiles/NataAvodesCV.pdf';
  
  const imagesData = ref([
    {
      id: 1,
      src: '../../../public/interior.jpg',
      title: 'Картинка 1',
      description:
        'Описание изображения 1. !!!Этот вопрос не раз ставил меня в тупик, потому что я родитель, и в то же время, обладаю  любопытством ребенка, выросшего в семье ученых. Скажем по-другому. Для меня это второй вопрос после "Есть ли Господь?" Я думаю, что ответ уже ясен из заглавной буквы слова',
    },
    {
      id: 2,
      src: '../../../public/interior.jpg',
      title: 'Картинка 2',
      description: 'Описание изображения 2',
    },
    {
      id: 3,
      src: '../../../public/interior.jpg',
      title: 'Картинка 3',
      description: 'Описание изображения 3',
    },
  ]);
  
  const showModal = ref(false);
const selectedImage = ref('');
const selectedTitle = ref('');
const selectedDescription = ref('');

const openModal = (src, title, description) => {
  selectedImage.value = src;
  selectedTitle.value = title;
  selectedDescription.value = description;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
  </script>
  
  <style>
  </style>
  