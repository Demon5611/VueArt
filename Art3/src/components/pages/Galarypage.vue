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
    </div>

    <div class="containerTextGalaryRightALL">
      <div class="textRight1">
        <h3 class="h1_1" style="margin-top: 1ch;">ПРОЦЕСС ЭВОЛЮЦИИ</h3>
        <p>
          Это яркий вызов современной реальности Нет ничего хуже интеллектуальных шор навязанных
          нам….Кем навязанных? Социальными предрассудками, бизнесом и личными интересами
          отдельных групп людей. Каждая картина заставляет задуматься о том, что делают люди
          КАЖДЫЙ ДЕНЬ. Мы на пути эволюции или деградации как вида? Решать тебе…
        </p>
        <p class="material">Материал: смешанная техника, графика. Размеры работ 80/100см</p>
      </div>

      <div class="textRight2">
        <h3 class="h2_2">КОРОЛЕВ</h3>
        <p>Размышление на тему живопись и любимый город</p>
        <p class="material">Материал: масло, пастель; графика. Размеры работ 30/40см</p>
      </div>

      <div class="textRight3">
        <h3 class="h3_3">МИГРАЦИОННЫЙ ЗАХВАТ</h3>
        <p >
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
      <div v-for="(image) in imagesData" :key="image.id" @click="openImage(image.src)">
        <div class="card">
          <img :src="image.src" />
        </div>
      </div>
      <a @click="handleDownload" class="cv">Скачать NataAvodesCV</a>
    </div>

  </div>
</template>

<script setup>

import { ref } from 'vue';
import NataAvodesCV from '../../../public/NataAvodesCV.pdf';
import interior from '../../../public/interior.jpg';
import monky1 from '../../../public/monky1.jpeg';
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = NataAvodesCV;
    link.target = '_blank';
    link.download = 'NataAvodesCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   };



const imagesData = ref([
  {
    id: 1,
    src: monky1,
    title: 'Картинка 1',
    description: 'Описание изображения 1. !!!Этот вопрос не раз ставил меня в тупик, потому что я родитель ...',
  },
  {
    id: 2,
    src: interior,
    title: 'Картинка 2',
    description: 'Описание изображения 2',
  },
  {
    id: 3,
    src: interior,
    title: 'Картинка 3',
    description: 'Описание изображения 3',
  },
]);

const openImage = (imageUrl) => {
  // Открывайте изображение в новом окне или модальном окне, как вам угодно.
  window.open(imageUrl, '_blank');
};
</script>

<style>
</style>
