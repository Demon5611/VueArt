<template>
    <div id="main" class="containerMainPage">
      <img class='headerImg' :src="headerImg" />
      <div class="containerText">
        <h3 class="firstText main_h_1">Добрый день )</h3>
        <article class="textAround1">
              Мне 36 лет, замужем, двое детей, кошка и пёс. Родилась и проживаю в самом космическом
              городе России — Королёв, Московская область. Проработать с чертежами ракет 10 лет, а
              затем начать в 2020 году вид деятельности как художник… «Приправить» старт пандемией и
              СВО… Как Вы считаете — это оптимизм или безумие? Это желание делать то, что может
              изменить взгляд многих людей на действительность — создавать соцарт своего времени
              помноженный на любовь к своему городу и его жителям.
        </article>
        <div class="text-end">
          <img class="img2" :src="monky1" />
          <h3 class="main_h_2">Мне есть ЧТО сказать</h3>
          <article>
                Так начался мой путь как художника. Вдохновение для создания своих работ я черпаю из
                острых социальных вопросов, не касающихся тем политики и религии. Моя цель –
                человек, зритель, личность и её место в этом мире.
          </article>
        </div>
        <img class="img3" :src="monky2" />
        <h3 class="h3_MainText3 main_h_3">Серийное производство</h3>
        <article class="textMainImg3">
              К процессу создания своих работ отношусь очень внимательно и скрупулезно, так как
              картины, чаще всего, создаю сериями. За каждым проектом стоит тщательно собранный
              исторический, художественный, а иногда и научный материал. Картины воплощаю
              преимущественно в графике. Выбор техники исполнения -коллаж, масло, акварель, цифровая
              иллюстрация, фото-зависит от проекта в целом и его концепции. Пример такой работы -
              серия картин «Обратный процесс эволюции», 2021 год.
          <br />
        </article>
        <a @click="handleDownloadCV" class="cv">Скачать био. NataAvodes</a>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import headerImg from '../../assets/headerImg.jpg';
  import monky1 from '../../assets/monky1.jpeg';
  import monky2 from '../../assets/monky2.jpg';
  import { downloadCVWithCache } from '../../services/fileDownloader';
  import NataAvodesBio from '../../assets/NataAvodesBio.pdf';  


  const handleDownloadCV = () => {
  downloadCVWithCache(NataAvodesBio, 'NataAvodesBio.pdf');
};

  </script>
  
  
