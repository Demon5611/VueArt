  <template>
    <div id="gallery">
      <div class="textRight1">
          <img src="../../assets/monky1.jpeg" class="card"  @click="openImage(imageUrl.monky1)"/>
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
    
          <img src="../../assets/interior.jpg" class="card" @click="openImage(imageUrl.interior)"/>
      
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
        
          <img src="../../assets/interior.jpg" class="card" @click="openImage(imageUrl.interior)"/>
    
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
  import NataAvodesCV from '../../assets/NataAvodesCV.pdf';
  import { default as interior } from '../../assets/interior.jpg';
  import monky1 from '../../assets/monky1.jpeg';


  const imageUrl = {
  interior,
  monky1,

}
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = NataAvodesCV;
    link.target = '_blank';
    link.download = 'NataAvodesCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openImage = (imageUrl) => {
  window.open(imageUrl, '_blank');
};
  </script>
