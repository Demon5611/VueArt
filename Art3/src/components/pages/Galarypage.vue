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
            <!-- <br /> -->
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
          <div v-for="(image, index) in imagesData" :key="image.id || index" @click="openModal(image.src)">
            <Card>
              <Card.Img :src="image.src" />
            </Card>
          </div>
          <!-- <a href="/path/to/NataAvodesCV.pdf" style="float: right; font-size: 1ch;" class="cv" download="NataAvodesCV.pdf">
            Скачать CV NataAvodes
          </a> -->
        </div>
      </div>
  
      <Modal :show="showModal" @hide="closeModal" size="lg" centered>
        <Modal.Body>
          <img :src="selectedImage || ''" alt="Selected" style="width: 100%" />
        </Modal.Body>
      </Modal>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { BCard, BModal } from 'bootstrap-vue';
//   import NataAvodesCV from '../../assets/srcfiles/NataAvodesCV.pdf';
  
  const imagesData = ref([
    {
      id: 1,
      src: '/interior.jpg',
      title: 'Картинка 1',
      description:
        'Описание изображения 1. Этот вопрос не раз ставил меня в тупик, потому что я родитель, и в то же время, обладаю  любопытством ребенка, выросшего в семье ученых. Скажем по-другому. Для меня это второй вопрос после "Есть ли Господь?" Я думаю, что ответ уже ясен из заглавной буквы слова',
    },
    {
      id: 2,
      src: '/interior.jpg',
      title: 'Картинка 2',
      description: 'Описание изображения 2',
    },
    {
      id: 3,
      src: '/interior.jpg',
      title: 'Картинка 3',
      description: 'Описание изображения 3',
    },
  ]);
  
  const showModal = ref(false);
  const selectedImage = ref(null);
  
  const openModal = (imageSrc) => {
    selectedImage.value = imageSrc;
    showModal.value = true;
  };
  
  const closeModal = () => {
    selectedImage.value = null;
    showModal.value = false;
  };
  </script>
  
  <style scoped>
  </style>
  