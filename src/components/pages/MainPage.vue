<template>
  <div>
    <div id="main">
      <img
        class="headerImg"
        :src="headerImg"
        alt="img"
        loading="eager"
        fetchpriority="high"
      />
      <div class="containerText grid-container">
        <div class="grid-item item1 main_h_1">
          <article class="textAround1">
            Меня зовут Наталия Седова. Творческий псевдоним "Nata Avodes". Я
            родилась и проживаю в самом космическом городе России — Королёв,
            Московская область. Проработать с чертежами ракет 10 лет, а затем
            начать в 2020 году вид деятельности как художник… «Приправить» старт
            пандемией и СВО… Как Вы считаете — это оптимизм или безумие? Это
            желание делать то, что может изменить взгляд многих людей на
            действительность — создавать соцарт своего времени помноженный на
            любовь к своему городу и его жителям.
          </article>
        </div>

        <div class="grid-item item2">
          <img class="img2" :src="nata1" alt="img" width="600" height="400" />
        </div>

        <div class="grid-item item5 main_h_2 main_h2_1">
          <h3>Серийное производство</h3>
          <article>
            К процессу создания своих работ отношусь очень внимательно и
            скрупулезно, так как картины, чаще всего, создаю сериями. За каждым
            проектом стоит тщательно собранный исторический, художественный и
            научный материал.
          </article>
        </div>

        <div class="grid-item item3 main_h_2 main_h2_2">
          <h3>Мне есть ЧТО сказать</h3>
          <article>
            Вдохновение для создания своих работ я черпаю из острых социальных
            вопросов, не касающихся тем политики и религии. Моя цель – человек,
            зритель, личность и её место в этом мире.
          </article>
        </div>

        <div class="grid-item item4">
          <img class="img3" :src="nata2" alt="img" width="600" height="400" />
        </div>

        <div class="grid-item item6">
          <a @click="downloadBio" href="#" class="cv cv_bio">
            Скачать bio + cv Nata Avodes
          </a>

          <a @click="downloadCV" href="#" class="cv cv_bio"
            >Скачать portfolio Nata Avodes</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import headerImg from "@/assets/headerImg.webp";
import nata1 from "@/assets/nata1.jpg";
import nata2 from "@/assets/nata2.jpg";
import { useDownloadDoc } from "@/composables/useDownloadDoc";

const { downloadBio, downloadCV } = useDownloadDoc();
console.log("downloadBio,downloadCV", downloadBio, downloadCV);
</script>


