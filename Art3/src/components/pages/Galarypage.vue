<template>
  <div id="gallery">
    <ImageCard
      :imageUrl="imageUrl.monky1"
      title="ПРОЦЕСС ЭВОЛЮЦИИ"
      description="Это яркий вызов современной реальности. Нет ничего хуже интеллектуальных шорт, навязанных нам….Кем навязанных? Социальными предрассудками, бизнесом и личными интересами отдельных групп людей. Каждая картина заставляет задуматься о том, что делают люди КАЖДЫЙ ДЕНЬ. Мы на пути эволюции или деградации как вида? Решать тебе…"
      material="Материал: смешанная техника, графика. Размеры работ 80/100см"
      @openImage="memoizedOpenImage"
    />

    <ImageCard
      :imageUrl="imageUrl.interior"
      title="КОРОЛЕВ"
      description="Это яркий вызов современной реальности. Нет ничего хуже интеллектуальных шорт, навязанных нам….Кем навязанных? Социальными предрассудками, бизнесом и личными интересами отдельных групп людей. Каждая картина заставляет задуматься о том, что делают люди КАЖДЫЙ ДЕНЬ. Мы на пути эволюции или деградации как вида? Решать тебе…"
      material="Материал: масло, пастель; графика. Размеры работ 30/40см"
      @openImage="memoizedOpenImage"
    />

    <ImageCard
      :imageUrl="imageUrl.interior"
      title="МИГРАЦИОННЫЙ ЗАХВАТ"
      description="Это яркий вызов современной реальности. Нет ничего хуже интеллектуальных шорт, навязанных нам….Кем навязанных? Социальными предрассудками, бизнесом и личными интересами отдельных групп людей. Каждая картина заставляет задуматься о том, что делают люди КАЖДЫЙ ДЕНЬ. Мы на пути эволюции или деградации как вида? Решать тебе…"
      material="Материал: цифровая графика, коллаж, печать на пенокартоне. Размеры работ 80/120см"
      @openImage="memoizedOpenImage"
    />

    <a @click="handleCachedDownload" class="cv">Скачать NataAvodesCV</a>
  </div>
</template>

<script setup>
import ImageCard from '../ImageCard.vue';
import NataAvodesCV from '../../assets/NataAvodesCV.pdf';
import { default as interior } from '../../assets/interior.jpg';
import monky1 from '../../assets/monky1.jpeg';
import memoize from 'lodash/memoize'; // Используем lodash для мемоизации

const imageUrl = {
  interior,
  monky1,
};

// Мемоизация функции открытия изображения
const openImage = (url) => {
  console.log('Открытие изображения:', url);
  window.open(url, '_blank');
};

// Используем lodash для мемоизации функции
const memoizedOpenImage = memoize(openImage);

// Кеширование скачивания файла
let isFileCached = false;
const handleCachedDownload = () => {
  if (!isFileCached) {
    const link = document.createElement('a');
    link.href = NataAvodesCV;
    link.target = '_blank';
    link.download = 'NataAvodesCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    isFileCached = true; // Помечаем, что файл был скачан
  } else {
    console.log('Файл уже скачан');
  }
};
</script>
