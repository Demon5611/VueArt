  <template>
    <div >
      <div class="textRight1">
        <img src="../../assets/monky1.jpeg" class="card" @click="openModalWindow" />
        <ModalWindow :imageSrc="imageSrc" :isModalOpen="isModalOpen" @close="closeModal" />
        <div class="textAfterCard1">
          <h4 class="h1_1">ПРОЦЕСС ЭВОЛЮЦИИ</h4>
          <p>
            Это яркий вызов современной реальности. Нет ничего хуже интеллектуальных шорт,
            навязанных нам….Кем навязанных? Социальными предрассудками, бизнесом и личными
            интересами отдельных групп людей. Каждая картина заставляет задуматься о том, что делают
            люди КАЖДЫЙ ДЕНЬ. Мы на пути эволюции или деградации как вида? Решать тебе…
          </p>
          <p class="material">Материал: смешанная техника, графика. Размеры работ 80/100см</p>
        </div>
      </div>

      <div class="textRight2">
        <img src="../../assets/interior.jpg" class="card" />
        <div class="textAfterCard2">
          <h4 class="h2_2">КОРОЛЕВ</h4>
          <p>
            Это яркий вызов современной реальности. Нет ничего хуже интеллектуальных шорт,
            навязанных нам….Кем навязанных? Социальными предрассудками, бизнесом и личными
            интересами отдельных групп людей. Каждая картина заставляет задуматься о том, что делают
            люди КАЖДЫЙ ДЕНЬ. Мы на пути эволюции или деградации как вида? Решать тебе…
          </p>
          <p class="material">Материал: масло, пастель; графика. Размеры работ 30/40см</p>
        </div>
      </div>

      <div class="textRight3">
        <img src="../../assets/interior.jpg" class="card" />
        <div class="textAfterCard3">
          <h4 class="h3_3">МИГРАЦИОННЫЙ ЗАХВАТ</h4>
          <p>
            Это яркий вызов современной реальности. Нет ничего хуже интеллектуальных шорт,
            навязанных нам….Кем навязанных? Социальными предрассудками, бизнесом и личными
            интересами отдельных групп людей. Каждая картина заставляет задуматься о том, что делают
            люди КАЖДЫЙ ДЕНЬ. Мы на пути эволюции или деградации как вида? Решать тебе…
          </p>
          <p class="material">
            Материал: цифровая графика, коллаж, печать на пенокартоне. Размеры работ 80/120см
          </p>
          <a @click="handleDownload" class="cv">Скачать NataAvodesCV</a>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { computed, ref, watchEffect } from 'vue';
import NataAvodesCV from '../../assets/NataAvodesCV.pdf';
import imageSrc from '../../assets/interior.jpg';
import ModalWindow from './ui/ModalWindow.vue';


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = NataAvodesCV;
    link.target = '_blank';
    link.download = 'NataAvodesCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isModalOpen = ref(false);

  const openModalWindow = () => {
    console.log('Opening modal');
    isModalOpen.value = true;
  };

  const closeModal = () => {
    console.log('Closing modal');
    isModalOpen.value = false;
  };
  const isModalOpenComputed = computed(() => isModalOpen.value);
  watchEffect(() => {
    if (isModalOpen.value) {
      // Additional logic if needed when modal is opened
      console.log('Modal opened');
    } else {
      // Additional logic if needed when modal is closed
      console.log('Modal closed');
    }
  });
  </script>

  <style>
  /* Ваши стили */
  </style>
